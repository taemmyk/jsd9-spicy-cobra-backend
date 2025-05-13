import mongoose from "mongoose";

const order_itemsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  order_line_id: { type: String, required: true, unique: true },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  sell_price: { type: Number },
  product: {
    product_id: String,
    title: String,
    image_thumbnail: String,
    price: Number,
    description: String,
  },
  ratingValue: Number,
  reviewContent: String,
});

const OrderItem = mongoose.model("OrderItem", order_itemsSchema);
export default OrderItem;
