import express from "express";
import { User } from "../../../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

export default () => {
  router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  router.post("/register", async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
      });

      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((el) => el.message);
        return res
          .status(400)
          .json({ error: "Validation Error", messages: errors });
      } else {
        res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  });

    router.get("/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  router.get("/:username", async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  router.patch("/status/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { status } = req.body;

      if (typeof status !== "boolean") {
        return res.status(400).json({
          error: "Invalid input",
          message: "Status must be a boolean value (true or false).",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((el) => el.message);
        return res
          .status(400)
          .json({ error: "Validation Error", messages: errors });
      } else {
        res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  });

  router.patch("/password/:userId/", async (req, res) => {
    try {
      const userId = req.params.userId;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          error: "Invalid input",
          message: "Please provide both old and new passwords.",
        });
      }

      const user = await User.findById(userId).select("+password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          error: "Authentication failed",
          message: "Incorrect old password.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((el) => el.message);
        return res
          .status(400)
          .json({ error: "Validation Error", messages: errors });
      } else {
        res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
    }
  });

  return router;
};
