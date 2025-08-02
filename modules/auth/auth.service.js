const ApiError = require("../../shared/utils/APIError");

const { saveUser } = require("../../domains/auth/auth.repo");
const { hashPassword } = require("../../common/helpers/hash");
const { createId, generateLetterImage } = require("../../common/helpers/Generate");
exports.createUser = async (data) => {
    const HashPassword = await hashPassword(data.password);
    const CreateId = await createId("USR", true, data.gender);
    const GenerateAavtar = await generateLetterImage((data.fName)[0]);

    const user = {
        UserId: CreateId,
        fName: data.fName,
        lName: data.lName,
        email: data.email,
        avatar: GenerateAavtar,
        password: HashPassword,
        gender : data.gender
    };

    const userData = await saveUser(user);

    const token = await generateToken({ userId: userData._id });

    return {
        user: {
            userId: userData.UserId,
            name: `${userData.fName} ${userData.lName}`,
            email: userData.email,
        },
        token
    };
};


const { findUserBy } = require("../../domains/auth/auth.repo");
const { comparePassword } = require("../../common/helpers/hash");
const { generateToken } = require("../../common/helpers/jwt");
exports.loginUser = async ({ email, password }) => {
    const user = await findUserBy("email", email);
    if (!user) new ApiError('User Not Found', 404);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) new ApiError('Invalid Password', 404);

    const token = await generateToken({ userId: user._id });

    return {
        user: {
            userId: user.UserId,
            name: `${user.fName} ${user.lName}`,
            email: user.email,
        },
        token
    };
}

const { GenerateaCode } = require("../../common/helpers/Generate");
const { hashNumber } = require("../../common/helpers/hash");
const { Massage } = require("../../common/helpers/massage");
exports.forgotPassword = async (email) => {
    const user = await findUserBy("email", email);
    if (!user) throw new ApiError('User Not Found', 404);

    const generateaCode = await GenerateaCode();
    const hashResertCode = await hashNumber(generateaCode);

    user.passwordResetCode = hashResertCode;
    user.passwordResetExpiret = Date.now() + 5 * 6 * 1000; // 5 minutes
    user.passwordResetVerifed = false;

    await user.save();

    const message = await Massage(user, generateaCode);

    return {
        message: 'Reset code sent to your email',
        code: generateaCode,
        text: message,
        user
    };
};

exports.VerifiedCode = async (req) => {
    const hashResertCode = await hashNumber(req.body.passwordResetCode);
    const user = await findUserBy("passwordResetCode", hashResertCode);
    user.passwordResetVerifed = true;
    await user.save();

    return {
        message: 'Code verified successfully'
    };
};

exports.Resetpassword = async (email, Password) => {
    const user = await findUserBy("email", email);
    user.password = await hashPassword(Password);;
    user.passwordResetCode = undefined;
    user.passwordResetExpiret = undefined;
    user.passwordResetVerifed = undefined;
    await user.save();

    const token = await generateToken({ userId: user._id });

    return {
        user,
        token
    };
};