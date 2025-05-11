import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // อ้างอิง collection User
    required: false,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // อ้างอิง collection Product
    required: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  total_price: {
    type: mongoose.Types.Decimal128,
    required: false,
  },
  status: {
    type: String,
    enum: ["cart", "pending", "paid", "cancelled"],
    default: "cart",
  },
  payment_method: {
    type: String,
    enum: ["credit_card",  "qrcode"],
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
  // download_status: {
  //   type: String,
  //   enum: ["not_downloaded", "downloaded"],
  //   default: "not_downloaded",
  // },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
