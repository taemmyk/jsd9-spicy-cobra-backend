import express from "express";
import Product from "../models/products.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/", async (req, res) => {
  const { genre } = req.query;

  const query = genre && genre !== "viewall"
    ? { genreId: genre } 
    : {};

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POS
router.post("/", async (req, res) => {
  try {
    // สร้างผลิตภัณฑ์ใหม่ โดยไม่ต้องใช้ idify แล้ว
    const newProduct = new Product(req.body);

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedData = {
      title: req.body.title || existingProduct.title,
      price: req.body.price || existingProduct.price,
      image_thumbnail: req.body.image_thumbnail || existingProduct.image_thumbnail,
      description: req.body.description || existingProduct.description,
      genreId: req.body.genreId || existingProduct.genreId,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
