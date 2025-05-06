import user from "../models/user.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();


export const getAlluser = async (req, res) => {
  try {
    const users = await user.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getuserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userData = await user.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const newuser = async (req, res) => {
  try {
    const newuser = new user(req.body);
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateuser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const existinguser = await user.findById(id);

    if (!existinguser) {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedData = req.body;

    const updateduser = await user.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.json(updateduser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
};

export const deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deleted = await user.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
