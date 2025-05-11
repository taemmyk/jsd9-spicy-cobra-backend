import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoute from "./router/products.js";
import orderRoute from "./router/orders.js";
import userRoute from "./router/user.js";
import loginRoute from "./router/login.js";
import {authenticate} from "./middleware/auth.js"
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
app.use("/products", authenticate,productRoute);
app.use("/orders",authenticate, orderRoute);
app.use("/user", userRoute);
app.use("/auth", loginRoute); 
app.use("/", loginRoute); 

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB error:", err));
console.log("SECRET:", process.env.SECRET);
console.log("REFRESH_SECRET:", process.env.REFRESH_SECRET);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
