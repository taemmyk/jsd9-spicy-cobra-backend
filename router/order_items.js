import express from "express";
import {
  getAllOrder_items,
  getOrder_itemsById,
  createOrder_items,
  updateOrder_items,
  deleteOrder_items,
} from "../controllers/orders_items.controller.js";

const router = express.Router();

router.get("/order_items", getAllOrder_items);
router.get("/order_items/:id", getOrder_itemsById);
router.post("/order_items", createOrder_items);
router.put("/order_items/:id", updateOrder_items);
router.delete("/order_items/:id", deleteOrder_items);

export default router;
