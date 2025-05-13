
import mongoose from "mongoose";

import{ User }from "../models/user.js"
// const router = express.Router();

export const getAlluser = async (req, res) => {
  try {
    const users = await User.find();
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

    const userData = await User.findById(id);

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
    const newuser = new User(req.body);
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
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

    const existinguser = await User.findById(id);

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

    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const User = {
//   getAlluser: getAlluser,
//   getuserById: getuserById,
//   newuser: newuser,
//   updateuser: updateuser,
//   deleteuser: deleteuser,
  
// };
