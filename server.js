import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import Product from './models/product.js';
const app = express();
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/node-api-101", {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});

app.post("/products", async (req, res) => {
  const payload = req.body;
  const product = new Product(payload);
  await product.save();
  res.status(201).end("สร้างสำเร็จ");
});
app.put("/products/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, { $set: payload });
  res.json(product);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);
  res.status(204).end("ลบสำเร็จ");
});

dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.listen(5000, () => {
  console.log("Application is running on port 5000");
});
const data = {
  $set: {
    newValue: "new data",
  },
};
Product.findByIdAndUpdate("ObjectId", data);
