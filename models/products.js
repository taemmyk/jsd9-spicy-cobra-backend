import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ProductId: { type: String, required: true , unique: true},
    title: { type: String, },
    description: String,
    genreId: { type: [String], required: true },  
    releaseDate: { type: Number, required: true },
    developer: String,
    developerAvatar: String,
    publisher: String,
    rating: { type: Number, min: 0, max: 10 }, 
    price: { type: Number,  },
    discountPercentage: Number,
    image_thumbnail: String,
    image_show_1: String,
    image_show_2: String,
    image_show_3: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
