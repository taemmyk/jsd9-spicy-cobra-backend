import mongoose from "mongoose";

const order_itemsSchema = new mongoose.Schema({
  order_line_id: { type: String, required: true, unique: true },
  order_id: { type: Number, required: true },
 product_id: { type: Number, required: true },
  sell_price: { type: Number },
});
const order_items = mongoose.model("Order_items", order_itemsSchema);
export default order_items;
