import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { authUser } from "../../../middleware/auth.js";
import { User } from "../../../models/User.js";

const router = express.Router();

// register a new user
router.post("/auth/register", createUser);

// login a user - jwt signed token
router.post("/auth/login", loginUser);

// Logout
router.post("/auth/logout", logoutUser);

// get users
router.get("/auth/users", getUsers);

// delete a user
router.delete("/auth/users/:id", deleteUser);

export default router;