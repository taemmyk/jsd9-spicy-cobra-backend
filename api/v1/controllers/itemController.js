import mongoose from "mongoose";
import { Order } from "../../../models/Order.js";
import { Item } from "../../../models/Item.js";

export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find()
      .populate("orderId", "orderNumber user")
    res.status(200).json({ error: false, total: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const getAllItemsByUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid user ID" });
    }

    const orders = await Order.find({ user: id });

    const orderIds = orders.map((order) => order._id);

    const items = await Item.find({ orderId: { $in: orderIds } })
      .populate("product", "name price");

    res.status(200).json({ error: false, total: items.length, data: items });
  } catch (error) {
    next(error);
  }
};