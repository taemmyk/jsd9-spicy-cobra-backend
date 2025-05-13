import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, unique: true },
    title: { type: String },
    description: String,
    genres: [{ type: Types.ObjectId, ref: "Genre", required: true }],
    releaseDate: { type: Number, required: true },
    developer: String,
    developerAvatar: String,
    publisher: String,
    rating: { type: Number, min: 0, max: 10 },
    price: { type: Number },
     discountPercentage: { type: Number },
    imageThumbnail: { type: String },
    imageSlideshow: [{ type: String }],
   
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
