import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: Types.ObjectId, ref: "Genre", required: true }],
  releaseDate: { type: Date },
  developerName: { type: String, required: true },
  developerAvatar: { type: String },
  publisherName: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  price: {
    type: Number,
    enum: [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
  },
  discountPercentage: { type: Number },
  imageThumbnail: { type: String },
  imageSlideshow: [{ type: String }],
});

export const Product = model("Product", ProductSchema);

/* -------------------------------------------------------------------------- */
/*        Example: Product Document based on the Schema, from the Chat        */
/* -------------------------------------------------------------------------- */
// {
//     "title": "The Last of Us Part II",
//     "description": "Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming. Living amongst a thriving community of survivors has allowed them peace and stability, despite the constant threat of the infected and other, more desperate survivors. When a violent event disrupts that peace, Ellie embarks on a relentless journey to carry out justice and find closure for those who have wronged her.",
//     "genres": [
//       "647489c7e9a3b2f5d8c7f1a0", // ObjectId referencing a Genre document (e.g., Action-Adventure)
//       "647489c7e9a3b2f5d8c7f1a1"  // ObjectId referencing another Genre document (e.g., Survival Horror)
//     ],
//     "releaseDate": "2020-06-19T00:00:00.000Z",
//     "developerName": "Naughty Dog",
//     "developerAvatar": "https://example.com/naughtydog_avatar.jpg",
//     "publisherName": "Sony Interactive Entertainment",
//     "rating": 4.8,
//     "price": 1990,
//     "discountPercentage": 20,
//     "imageThumbnail": "https://example.com/thelastofus2_thumbnail.jpg",
//     "imageSlideshow": [
//       "https://example.com/thelastofus2_slide1.jpg",
//       "https://example.com/thelastofus2_slide2.jpg",
//       "https://example.com/thelastofus2_slide3.jpg"
//     ],
//     "__v": 0,
//     "_id": "647489d3e9a3b2f5d8c7f1a2"
// }