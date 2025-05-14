import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser, updateUserStatus,
  forgotPassword,
  resetPassword,
  updatePasswordUser
} from "../controllers/userController.js";
import { authUser } from "../../../middleware/auth.js";
import { User } from "../../../models/User.js";
import rateLimit from "express-rate-limit";

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // reset password 5 times
  message: "Too many password reset requests, please try again later."
});


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

// ban user
router.patch("/auth/status/:id", authUser, updateUserStatus);

// forgot password
router.post("/auth/forgot-password", forgotPasswordLimiter, forgotPassword);

// reset password
router.post("/auth/reset-password/:token", resetPassword);

router.post("/auth/users/update-password", authUser, updatePasswordUser);

export default router;
