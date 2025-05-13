import express from "express";
import {
  getAllOrder,
  getOrderById,
  createOrder,
  updateOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrderById);

export default () => router;
