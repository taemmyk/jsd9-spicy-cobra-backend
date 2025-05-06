import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./router/products.js"; 
import userRoute from "./router/user.js"
import orderRoute from './router/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use("/products", productRoute); 
app.use("/user", userRoute)
app.use("/orders",orderRoute)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB error:", err));


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
