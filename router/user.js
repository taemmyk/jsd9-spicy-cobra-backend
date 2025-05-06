import express from "express";
import {
  getAlluser,
  getuserById,
  newuser,
  updateuser,
  deleteuser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAlluser);
router.get("/:id",getuserById);
router.post("/", newuser);
router.put("/:id", updateuser);
router.delete("/:id", deleteuser);

export default router;
