import express from "express";
import {
  getAllItems,
  getAllItemsByUserId,
} from "../controllers/itemController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

router.get("/", authUser, getAllItems);
router.get("/:id", authUser, getAllItemsByUserId);

export default () => router;
