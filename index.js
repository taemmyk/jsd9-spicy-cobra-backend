import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./api/v1/routes/users.js";
import genreRoute from "./api/v1/routes/genres.js";
// import orderRoute from "./api/v1/routes/orders.js";
import productRoute from "./api/v1/routes/products.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", userRoutes());
app.use("/genres", genreRoute());
// app.use("/orders", orderRoute());
app.use("/products", productRoute());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Database");
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
