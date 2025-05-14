// import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models/User.js";

// register a new user controller
export const createUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        error: true,
        message: "Email already in use.",
      });
    }

    const user = new User({ email, password, confirmPassword });
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

// get users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdOn");
    res.status(200).json({
      error: false,
      users,
      message: "All users retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch users",
      details: err.message,
    });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(204).json({ message: "delete a user successfully" }).end();
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete a user",
      details: err.message,
    });
  }
};

export const profileUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.user._id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    res.status(200).json({ error: false, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: true, message: "/profile/err" });
  }
};
