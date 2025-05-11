import express from "express";
import mongoose from "mongoose";
import { Product } from "../../../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Product ID" });
    }

    try {
        const product = await Product.findById(id).populate("genres");

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);

    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      genres,
      releaseDate,
      developerName,
      developerAvatar,
      publisherName,
      rating,
      price,
      discountPercentage,
      imageThumbnail,
      imageSlideshow,
    } = req.body;

    if (!title || !description || !developerName || genres?.length === 0) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Title, description, developer, and at least one genre are required.",
      });
    }

    const newProduct = new Product({
      title,
      description,
      genres,
      releaseDate,
      developerName,
      developerAvatar,
      publisherName,
      rating,
      price,
      discountPercentage,
      imageThumbnail,
      imageSlideshow,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res
        .status(400)
        .json({ error: "Validation Error", message: errors.join(", ") });
    }
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Product ID" });
  }

  try {
    const {
      title,
      description,
      genres,
      releaseDate,
      developerName,
      developerAvatar,
      publisherName,
      rating,
      price,
      discountPercentage,
      imageThumbnail,
      imageSlideshow,
    } = req.body;

    if (!title || !description || !developerName || genres?.length === 0) {
      return res
        .status(400)
        .json({
          error: "Bad Request",
          message:
            "Title, description, developer, and at least one genre are required.",
        });
    }

    if (genres && Array.isArray(genres)) {
      const areValidObjectIds = genres.every((genreId) =>
        mongoose.Types.ObjectId.isValid(genreId)
      );
      if (!areValidObjectIds) {
        return res
          .status(400)
          .json({ error: "Invalid Genre IDs in the array" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        genres,
        releaseDate,
        developerName,
        developerAvatar,
        publisherName,
        rating,
        price,
        discountPercentage,
        imageThumbnail,
        imageSlideshow,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res
        .status(400)
        .json({ error: "Validation Error", message: errors.join(", ") });
    }
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});
export default () => router;
