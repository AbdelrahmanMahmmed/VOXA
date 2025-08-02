const { createUser, loginUser, forgotPassword, VerifiedCode, Resetpassword } = require("./auth.service");
const SendEmail = require("../../shared/utils/sendEmail");
const ApiError = require("../../shared/utils/APIError");
exports.registerUser = async (req, res, next) => {
    try {
        const result = await createUser(req.body);

        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.COOKIE_EXPIRES_TIME,
            sameSite: "Lax"
        });
        res.status(201).json({
            status: "success",
            massage: "User registered successfully",
            data: {
                User: result.user,
                token: result.token
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);

        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.COOKIE_EXPIRES_TIME,
            sameSite: "Lax"
        });

        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: {
                user: result.user,
                token: result.token
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.logout = async (res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: "Lax"
        });

        res.status(200).json({
            status: "success",
            message: "User logged out successfully"
        });
    } catch (err) {
        next(err);
    }
};

exports.ForgotPassword = async (req, res, next) => {
    const result = await forgotPassword(req.body.email);
    try {
        await SendEmail({
            to: result.user.email,
            subject: 'Password Code From TEST',
            text: result.text
        });
    } catch (err) {
        result.user.passwordResetCode = undefined,
            result.user.passwordResetExpiret = undefined,
            result.user.passwordResetVerifed = undefined,
            await result.user.save();
        return next(new ApiError('Failed to send email, please try again later', 500));
    }

    try {
        res.status(200).json({
            status: "success",
            message: result.message
        });
    } catch (err) {
        next(err);
    }
};

exports.VerifiedCode = async (req, res, next) => {
    try {
        const result = await VerifiedCode(req);

        res.status(200).json({
            status: "success",
            message: result.message
        });
    } catch (err) {
        next(err);
    }
};

exports.Resetpassword = async (req, res, next) => {
    try {
        const result = await Resetpassword(req.body.email, req.body.newPassword);

        if (!result.user) return next(new ApiError('There is no user with email ' + req.body.email, 404));
        if (!(result.user.passwordResetVerifed)) next(new ApiError('Invalid or expired reset password code', 400));

        res.cookie('token', result.token, {
            httpOnly: true,
            secure: true,
            maxAge: process.env.COOKIE_EXPIRES_TIME,
            sameSite: "Lax"
        });

        res.status(200).json({
            status: "success",
            message: "Password reset successfully",
            data: {
                user: result.user,
                token: result.token
            }
        });
    } catch (err) {
        next(err);
    }
};