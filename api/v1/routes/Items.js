import express from "express";
import { createItem, getAllItems, getAllItemsByUserId } from "../controllers/itemController";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getAllItemsByUserId);
router.post("/", createItem);

export default () => router;