const jwt = require("jsonwebtoken");
const ApiError = require("../../shared/utils/APIError");
const TrustedDevice = require("../../domains/TrustedDevice/TrustedDevice.model");
const { saveUser, findUserBy } = require("../../domains/auth/auth.repo");
const { hashPassword, comparePassword, hashNumber } = require("../../common/helpers/hash");
const { GenerateaCode, createId, generateLetterImage, generateDeviceId } = require("../../common/helpers/Generate");
const { generateToken } = require("../../common/helpers/jwt");
const { Message, sendVerificationEmail } = require("../../common/helpers/massage");

class AuthService {
  async createUser(data, req) {
    const HashPassword = await hashPassword(data.password);
    const CreateId = createId("USR", true, data.gender);
    const GenerateAavtar = await generateLetterImage(data.fName[0]);

    const user = {
      UserId: CreateId,
      fName: data.fName,
      lName: data.lName,
      email: data.email,
      avatar: GenerateAavtar,
      password: HashPassword,
      gender: data.gender,
      IdDeviceItsRegistered: generateDeviceId(req),
    };

    const userData = await saveUser(user);

    const token = await generateToken({ userId: userData._id });

    return {
      user: {
        userId: userData.UserId,
        name: `${userData.fName} ${userData.lName}`,
        email: userData.email,
      },
      token,
    };
  };

  async loginUser(email, password, req) {
    const user = await findUserBy("email", email);
    if (!user || user.IsDeleted)
      throw new ApiError("User Not Found or Deleted", 404);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new ApiError("Invalid Password", 404);

    const deviceId = generateDeviceId(req);

    if (user.IdDeviceItsRegistered !== deviceId) {
      const trusted = await TrustedDevice.findOne({ userId: user._id, deviceId });
      if (!trusted) {
        const verifyToken = jwt.sign(
          { userId: user._id, deviceId },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "15m" },
        );
        await sendVerificationEmail(user.email, verifyToken, user);
        throw new ApiError(
          "New device detected. Check your email to verify.",
          403,
        );
      }
    }

    const token = await generateToken({ userId: user._id });
    return {
      user: {
        userId: user.UserId,
        name: `${user.fName} ${user.lName}`,
        email: user.email,
      },
      token,
    };
  };

  async forgotPassword(email) {
    const user = await findUserBy("email", email);
    if (!user) throw new ApiError("User Not Found", 404);

    const resetCode = await GenerateaCode();
    const hashResetCode = await hashNumber(resetCode);

    user.passwordResetCode = hashResetCode;
    user.passwordResetExpiret = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.passwordResetVerifed = false;

    await user.save();

    const message = await Message(user, resetCode);

    return {
      message: "Reset code sent to your email",
      code: resetCode,
      html: message,
      user,
    };
  };

  async VerifiedCode(req) {
    const hashResertCode = await hashNumber(req.body.code);
    const user = await findUserBy("passwordResetCode", hashResertCode);

    if (!user) {
      throw new ApiError("Invalid or expired code", 400);
    }

    user.passwordResetVerifed = true;
    await user.save();

    return {
      message: "Code verified successfully",
    };
  };

  async Resetpassword(email, Password) {
    const user = await findUserBy("email", email);

    if (!user) {
      throw new ApiError("There is no user with email", 400);
    }

    user.password = await hashPassword(Password);
    user.passwordResetCode = undefined;
    user.passwordResetExpiret = undefined;
    user.passwordResetVerifed = undefined;
    await user.save();

    const token = await generateToken({ userId: user._id });

    return {
      user,
      token,
    };
  };

  async verifyDevice(req, res) {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const exists = await TrustedDevice.findOne({
        userId: decoded.userId,
        deviceId: decoded.deviceId,
      });

      if (exists)
        return res
          .status(400)
          .json({ message: "Invalid or expired verification link" });

      await TrustedDevice.create({
        userId: decoded.userId,
        deviceId: decoded.deviceId,
      });

      res.json({ message: "Device verified. Please login again." });
    } catch (err) {
      res.status(400).json({ message: "Invalid or expired verification link" });
    }
  };
}

module.exports = new AuthService();