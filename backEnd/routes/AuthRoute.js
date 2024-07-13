const express = require("express");
const {
  Register,
  VerifyEmail,
  ResendVerificationCode,
  login,
  Logout,
  loginUser,
  refresh,
  resetPasswordRequest,
  resetPassword,
  VerifyResetPasswordCode,
  ProtectedRoute,
} = require("../controller/AuthController");
const validateToken = require("../middleware/ValidateTokenHandler");

const router = express.Router();
router.post("/register", Register);
router.post("/verify-email", VerifyEmail);
router.post("/resend-verification-code", ResendVerificationCode);
router.post("/login", login);
router.get("/Logout", validateToken, Logout);
router.get("/refresh", refresh);
router.get("/own", validateToken, loginUser);
router.get("/protected", validateToken, ProtectedRoute);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/verify-code", VerifyResetPasswordCode);
router.post("/reset-password", resetPassword);
module.exports = router;
