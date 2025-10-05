import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// @desc   Register user
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: { code: "FIELD_REQUIRED", field: "email", message: "Email is required" } });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: { code: "USER_EXISTS", message: "User already exists" } });

  const user = await User.create({ name, email, password, role });
  if (user) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } else {
    res.status(400).json({ error: { code: "USER_CREATE_FAILED", message: "User creation failed" } });
  }
});

// @desc   Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } else {
    res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });
  }
});

export default router;
