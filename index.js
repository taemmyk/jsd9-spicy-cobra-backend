import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./api/v1/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", userRoutes());
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Mongo Database");
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
    process.exit(1);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
