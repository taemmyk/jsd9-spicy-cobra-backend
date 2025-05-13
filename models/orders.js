import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // อย่าลืมให้มัน required จริง
  },
  total_price: {
    type: mongoose.Types.Decimal128,
  },
  status: {
    type: String,
    enum: ["cart", "pending", "paid", "cancelled"],
    default: "cart",
  },
  payment_method: {
    type: String,
    enum: ["credit_card", "qrcode"],
    default: null,
  },
  transaction_date: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});



const Order = mongoose.model("Order", orderSchema);
export default Order;

