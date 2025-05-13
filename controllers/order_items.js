import express from "express";
import order_items from "../models/order_items.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

export const getOrderitem = async (req, res) => {
  try {
    const items = await order_items
      .find()
      .populate("order_id")
      .populate("product_id");
      
    res.json(items);
  } catch (error) {
    console.error("Failed to fetch order items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrder_itemsById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid items ID" });
    }

    const order_items = await order_items.findById(id);

    if (!order_items) {
      return res.status(404).json({ message: "items not found" });
    }

    res.json(order_items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POSt
export const neworder_items = async (req, res) => {
  try {
    const neworder_items = new order_items(req.body);

    await neworder_items.save();
    res.status(201).json(neworder_items);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default router;
