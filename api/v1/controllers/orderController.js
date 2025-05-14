import mongoose from "mongoose";
import { Order } from "../../../models/Order.js";
import { Item } from "../../../models/Item.js";

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate({
        path: "items",
        populate: {
          path: "product",
          select: "title price",
        },
      });
    res.status(200).json({ error: false, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderByOrderId = async (req, res, next) => {
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

export const getOrderByUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ user: id }).populate({
      path: "items",
      populate: {
        path: "product",
        select: "title",
      },
    });
    res.status(200).json({
      error: false,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaidOrderProductsByUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const paidOrders = await Order.find({ user: id, orderStatus: "Paid" })
      .select(
        "-orderNumber -user -totalPrice -orderStatus -paymentMethod -orderAt -transactionAt"
      )
      .populate({
        path: "items",
        populate: {
          path: "product",
          select: "title imageThumbnail developerName",
        },
      })
      .sort({ orderAt: -1 });

    res.status(200).json({
      error: false,
      total: paidOrders.length,
      data: paidOrders,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  const user = req.user.user._id;
  const { products, totalPrice, paymentMethod } = req.body;

  try {
    if (
      !user ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0 ||
      totalPrice === undefined ||
      totalPrice === null
    ) {
      return res.status(400).json({
        error: true,
        message:
          "Please provide products (as an array with productId and sellPrice), totalPrice, and orderStatus",
      });
    }

    // Query จำนวน Order ทั้งหมด
    const orderCount = await Order.countDocuments();

    // สร้าง Order Number
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const nextNumber = (orderCount + 1).toString().padStart(4, "0");
    const orderNumber = `${year}${month}-${nextNumber}`;

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

export const getOrderCount = async (req, res, next) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ error: false, count });
  } catch (error) {
    next(error);
  }
};
