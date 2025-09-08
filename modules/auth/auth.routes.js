const express = require("express");
const AuthController = require("./auth.controller");
const { verifyDevice } = require("./auth.service");

const { RegisterUserValidator, LoginUserValidator, resetpasswordVaild } = require("./auth.validators");
const router = express.Router();

// Route to handle user
router.post("/register", RegisterUserValidator, AuthController.registerUser);
router.post("/login", LoginUserValidator, AuthController.loginUser);
router.post("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.ForgotPassword);
router.post("/verify-Code", AuthController.VerifiedCode);
router.post("/reset-password", resetpasswordVaild, AuthController.Resetpassword);
router.get("/verify-device", verifyDevice);

// Export the router to be used in the main app
module.exports = router;