import { Schema, model, Types } from "mongoose";

const ItemSchema = new Schema({
  orderId: { type: Types.ObjectId, ref: "Order", required: true },
  product: { type: Types.ObjectId, ref: "Product", required: true },
  sellPrice: { type: Number },
  purchasedAt: { type: Date, default: new Date().getTime() },
});

export const Item = model("Item", ItemSchema);
