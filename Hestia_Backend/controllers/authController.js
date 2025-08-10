const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../models/userModel");
require("dotenv").config();
const sendEmail = require("../utils/sendEmail");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser.id);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(existingUser.id);
    res.json({ token });
  } catch {
    console.error("Login error:", err); // helpful for debugging
    res.status(500).json({ message: "Something went wrong during login" });
  }
};

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findByEmail(email);

  if (!user) return res.status(404).json({ message: "User not found" });

  const secret = process.env.JWT_SECRET + user.password;
  const hashedToken = jwt.sign({ id: user._id, email: user.email }, secret, {
    expiresIn: "1h",
  });

  if (!user.reset_token) {
    await UserModel.saveResetToken(user.id, hashedToken, expires);
  }

  const resetUrl = `http://localhost:8080/api/auth/resetpassword?id=${user.id}&token=${hashedToken}`;

  // In a real app, send an email instead
  await sendEmail(email, "reset password", resetUrl);

  console.log(`🔗 Reset URL: ${resetUrl}`);

  res.json({ message: "Reset link sent (check console)" });
};

const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = UserModel.findById(id);

  if (!user) {
    return res.status(400).json({ message: "Users does not exists!" });
  }

  const secret = process.env.JWT_SECRET + user.password;

  const verify = jwt.verify(token, secret);

  const encryptedPassword = await bcrypt.hash(password, 10);

  await UserModel.updatePassword(id, encryptedPassword);
};

module.exports = {
  register,
  login,
  logout,
  resetPasswordRequest,
  resetPassword,
};
