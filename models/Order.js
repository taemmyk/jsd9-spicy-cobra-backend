import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  items: [{ type: Types.ObjectId, ref: "Item", required: true }],
  totalPrice: { type: Number, required: true },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Paid", "Cancelled"],
  },
  paymentMethod: { type: String, enum: ["Credit Card", "QR"] },
  orderAt: { type: Date, default: new Date().getTime() },
  transactionAt: { type: Date, default: new Date().getTime() },
});

export const Order = model("Order", OrderSchema);