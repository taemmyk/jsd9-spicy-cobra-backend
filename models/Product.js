import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: Types.ObjectId, ref: "Genre", required: true }],
  releaseDate: { type: Date },
  developerName: { type: String, required: true },
  developerAvatar: { type: String },
  publisherName: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  price: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
    enum: [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
  },
  imageThumbnail: { type: String, required: true },
  imageSlideshow: [{ type: String }],
});

export const Product = model("Product", ProductSchema);