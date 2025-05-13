import express from "express";
import {
  getAllItems,
  getAllItemsByUserId,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getAllItemsByUserId);

export default () => router;
