import express from "express";
import {
  getAllAdminInvites,
  getAdminInviteByEmail,
  createAdminInvite,
} from "../controllers/invitedAdminsController.js";
const router = express.Router();

// get invited admin data by email
router.get("/:email", getAdminInviteByEmail);

// get all invited admins list
router.get("/", getAllAdminInvites);

// create a new invited admin
router.post("/", createAdminInvite);

export default () => router;
