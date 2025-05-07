// import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models/User.js";

// register a new user controller
export const createUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        error: true,
        message: "Email already in use.",
      });
    }

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({
      error: false,
      message: "User register succussfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// login a user - jwt signed token controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: true,
        message: "Invalid credentials - user not found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        error: true,
        message: "Invalid credentials - user not match",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      error: false,
      token,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Server error",
      details: err.message,
    });
  }
};

// Logout controller
export const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
