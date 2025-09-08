const authService = require("./auth.service");
const SendEmail = require("../../shared/utils/sendEmail");
const ApiError = require("../../shared/utils/APIError");

class AuthController {

  async registerUser(req, res, next) {
    try {
      const result = await authService.createUser(req.body, req);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax",
      });
      res.status(201).json({
        status: "success",
        massage: "User registered successfully",
        data: {
          User: result.user,
          token: result.token,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  async loginUser(req, res, next) {
    try {
      const result = await authService.loginUser(req.body.email, req.body.password, req);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax",
      });

      res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  async logout(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });

      return res.status(200).json({
        status: "success",
        message: "User logged out successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  async ForgotPassword(req, res, next) {
    let result;
    try {
      result = await authService.forgotPassword(req.body.email);

      await SendEmail({
        to: result.user.email,
        subject: "Password Code From VOXA",
        html: result.html,
      });

      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (err) {
      if (result && result.user) {
        result.user.passwordResetCode = undefined;
        result.user.passwordResetExpiret = undefined;
        result.user.passwordResetVerifed = undefined;
        await result.user.save();
      }
      return next(
        new ApiError(
          err.message || "Failed to send email, please try again later",
          500,
        ),
      );
    }
  };

  async VerifiedCode(req, res, next) {
    try {
      const result = await authService.VerifiedCode(req);

      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (err) {
      next(err);
    }
  };

  async Resetpassword(req, res, next) {
    try {
      const result = await authService.Resetpassword(req.body.email, req.body.newPassword);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax",
      });

      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
        data: {
          token: result.token,
        },
      });
    } catch (err) {
      next(err);
    }
  };

}

module.exports = new AuthController();