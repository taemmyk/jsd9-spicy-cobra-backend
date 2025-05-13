import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderItemsRoute from "./router/order_items.js";
import productRoute from "./router/products.js";
import orderRoute from "./router/orders.js";
import userRoute from "./router/user.js";
import loginRoute from "./router/login.js";
import { verifyAuthToken } from './middleware/auth.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: ["http://localhost:5173", ],
  credentials: true, 
};


app.use(cors(corsOptions));
app.use(express.json());
// app.use(authenticate)

// Routes
app.use("/products",productRoute);
app.use("/orders", verifyAuthToken, orderRoute);
app.use("/user",verifyAuthToken, userRoute);
app.use("/auth", loginRoute); 
app.use("/", loginRoute); 
app.use("/order_items",verifyAuthToken,orderItemsRoute);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB error:", err));
console.log("SECRET:", process.env.SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
