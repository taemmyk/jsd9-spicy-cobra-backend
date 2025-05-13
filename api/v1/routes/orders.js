import express from "express";
import {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrderById,
} from "../controllers/orderController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.post("/", authUser, createOrder);
router.patch("/:id", authUser, updateOrderById);

export default () => router;
