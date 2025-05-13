import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  email: { type: Types.ObjectId, ref: "User", required: true },
  product: { type: Types.ObjectId, ref: "Product", required: true },
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