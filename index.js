import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js"
import userRoutes from "./api/v1/userRoutes.js";
import invitedAdminRoutes from "./api/v1/routes/invitedAdmins.js";
import productRoutes from "./api/v1/routes/products.js";
import genreRoutes from "./api/v1/routes/genres.js";
import orderRoutes from "./api/v1/routes/orders.js";
import itemRoutes from "./api/v1/routes/Items.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.CLIENT_URL, // URL ของ Frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  // something with jwt ?
  credentials: true, //this cookie
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware สำหรับ form-urlencoded

app.use("/", userRoutes());
app.use("/admin/invite", invitedAdminRoutes());
app.use("/products", productRoutes());
app.use("/genres", genreRoutes());
app.use("/orders", orderRoutes());
app.use("/items", itemRoutes());
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Database");
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
})();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
