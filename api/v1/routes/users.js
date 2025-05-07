import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

// register a new user
router.post("/auth/register", createUser);

// login a user - jwt signed token
router.post("/auth/login", loginUser);

// Logout
router.post("/auth/logout", logoutUser);

export default router;
