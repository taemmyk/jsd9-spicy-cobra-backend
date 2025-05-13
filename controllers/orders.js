import Order from "../models/orders.js";
import mongoose from "mongoose";

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .populate("total_price","order_id")
      

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id)
      .populate("user_id", "name email")
      .populate("total_price","order_id");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const newOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      user_id: req.user.id,
      product_id: req.body.product_id,
      total_price: req.body.total_price,
      order_id:req.body.order_id,
      

    });

    await newOrder.save();
    res.status(201).json(newOrder);
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


export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const existingorder = await Order.findById(id);
    if (!existingorder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedData = {
      user_id: req.body.user_id || existingorder.user_id,
      product_id: req.body.product_id || existingorder.product_id,
      quantity: req.body.quantity || existingorder.quantity,
      total_price: req.body.total_price || existingorder.total_price,
      status: req.body.status || existingorder.status,
      payment_method: req.body.payment_method || existingorder.payment_method,
      transaction_date:
        req.body.transaction_date || existingorder.transaction_date,
      download_status:
        req.body.download_status || existingorder.download_status,
    };

    const updatedorder = await Order.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.json(updatedorder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
