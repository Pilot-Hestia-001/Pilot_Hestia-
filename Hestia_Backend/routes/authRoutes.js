const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  register,
  login,
  logout,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resetPasswordRequest", resetPasswordRequest);
router.post("/resetPassword", resetPassword);

router.get("/me", protect, (req, res) => {
  res.send(`You are user ID: ${req.user}`);
});

module.exports = router;
