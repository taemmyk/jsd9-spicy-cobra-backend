import express from "express";
import {
  getAllOrder,
  getOrderByOrderId,
  getOrderByUserId,
  getPaidOrderProductsByUserId,
  createOrder,
  updateOrderById,
  getOrderCount,
} from "../controllers/orderController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

router.get("/count", getOrderCount);

router.get("/", authUser, getAllOrder);
router.get("/user/:id", authUser, getOrderByUserId);
router.get("/games/:id", authUser, getPaidOrderProductsByUserId);
router.get("/:id", authUser, getOrderByOrderId);
router.post("/", authUser, createOrder);
router.patch("/:id", authUser, updateOrderById);

export default () => router;
