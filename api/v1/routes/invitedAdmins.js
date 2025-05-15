import express from "express";
import {
  getAllAdminInvites,
  getAdminInviteByEmail,
  createAdminInvite,
} from "../controllers/invitedAdminController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

// get invited admin data by email
router.get("/:email", getAdminInviteByEmail);

// get all invited admins list
router.get("/", authUser, getAllAdminInvites);

// create a new invited admin
router.post("/", authUser, createAdminInvite);

export default () => router;
