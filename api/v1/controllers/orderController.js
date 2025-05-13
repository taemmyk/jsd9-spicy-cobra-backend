import mongoose from "mongoose";
import { Order } from "../../../models/Order.js";
import { Item } from "../../../models/Item.js";

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("product", "name price");
    res.status(200).json({ error: false, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: true, message: "Invalid order ID" });
    }
    const order = await Order.findById(id)
      .populate("user", "username email")
      .populate("product", "name price");
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }
    res.status(200).json({ error: false, data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const user = req.user.user._id;
  const { orderNumber, products, totalPrice, orderStatus, paymentMethod } =
    req.body;

  try {
    if (
      !orderNumber ||
      !user ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      totalPrice === undefined ||
      totalPrice === null ||
      !orderStatus
    ) {
      return res.status(400).json({
        error: true,
        message:
          "Please provide orderNumber, products (as an array with productId and sellPrice), totalPrice, and orderStatus",
      });
    }

    const createdItemsData = [];

    for (const itemData of products) {
      const { productId, sellPrice } = itemData;
      if (!productId || sellPrice === undefined || sellPrice === null) {
        return res.status(400).json({
          error: true,
          message: "Each item in the array must have productId and sellPrice",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res
          .status(400)
          .json({ error: true, message: "Invalid product ID" });
      }

      createdItemsData.push({
        product: productId,
        sellPrice: sellPrice,
      });
    }

    const newOrder = new Order({
      orderNumber,
      user,
      totalPrice,
      orderStatus,
      paymentMethod,
      items: [],
    });

    const savedOrder = await newOrder.save();
    const orderId = savedOrder._id;

    const createdItems = [];
    for (const itemData of createdItemsData) {
      const newItem = new Item({
        orderId: orderId,
        product: itemData.product,
        sellPrice: itemData.sellPrice,
      });
      const savedItem = await newItem.save();
      createdItems.push(savedItem._id);
    }

    savedOrder.items = createdItems;
    await savedOrder.save();

    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("user", "username email")
      .populate({
        path: "items",
        populate: { path: "product", select: "name price" },
      });

    res.status(201).json({ error: false, data: populatedOrder });
  } catch (error) {
    next(error);
  }
};

export const updateOrderById = async (req, res, next) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: true, message: "Invalid order ID" });
    }

    if (orderStatus !== "Paid" && orderStatus !== "Cancelled") {
      return res.status(400).json({
        error: true,
        message:
          "Invalid orderStatus for payment update. Must be 'Paid' or 'Cancelled'.",
      });
    }

    const updateData = {
      orderStatus: orderStatus,
    };

    if (orderStatus === "Paid") {
      updateData.transactionAt = new Date().getTime();
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("user", "username email")
      .populate({
        path: "items",
        populate: { path: "product", select: "name price" },
      });

    if (!updatedOrder) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    res.status(200).json({ error: false, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};
