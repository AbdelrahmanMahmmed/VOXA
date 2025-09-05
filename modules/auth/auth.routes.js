const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  ForgotPassword,
  VerifiedCode,
  Resetpassword,
} = require("./auth.controller");
const {
  RegisterUserValidator,
  LoginUserValidator,
  resetpasswordVaild,
} = require("./auth.validators");

const router = express.Router();

// Route to handle user
router.post("/register", RegisterUserValidator, registerUser);
router.post("/login", LoginUserValidator, loginUser);
router.post("/logout", logout);
router.post("/forgot-password", ForgotPassword);
router.post("/verify-Code", VerifiedCode);
router.post("/reset-password", resetpasswordVaild, Resetpassword);

// Export the router to be used in the main app
module.exports = router;
