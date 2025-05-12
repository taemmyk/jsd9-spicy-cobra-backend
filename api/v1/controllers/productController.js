import mongoose from "mongoose";
import { Product } from "../../../models/Product.js";
import { Genre } from "../../../models/Genre.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductByProductId = async (req, res, next) => {
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
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate("genres");

    if (!product) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductsByGenreId = async (req, res, next) => {
  const { genreId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(genreId)) {
    return res.status(400).json({ error: "Invalid Genre ID" });
  }

  try {
    const products = await Product.find({ genres: genreId }).populate("genres");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductsByGenreName = async (req, res, next) => {
  const { genreName } = req.params;

  if (!genreName) {
    return res
      .status(400)
      .json({ error: true, message: "Genre Name is required" });
  }

  try {
    const genre = await Genre.findOne({
      genreName: { $regex: new RegExp(`^${genreName}$`, "i") },
    });

    if (!genre) {
      return res
        .status(404)
        .json({ error: true, message: `Genre "${genreName}" not found` });
    }

    const products = await Product.find({ genres: genre._id }).populate(
      "genres"
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
        { developerName: { $regex: q, $options: "i" } },
      ];
    }

    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Failed to search products." });
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      slug,
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

    if (
      !title ||
      !slug ||
      !description ||
      !developerName ||
      genres?.length === 0
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Title, slug, description, developer, and at least one genre are required.",
      });
    }

    const newProduct = new Product({
      title,
      slug,
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
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Product ID" });
  }

  try {
    const {
      title,
      slug,
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

    if (
      !title ||
      !slug ||
      !description ||
      !developerName ||
      genres?.length === 0
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message:
          "Title, slug, description, developer, and at least one genre are required.",
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
        slug,
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
    next(error);
  }
};

export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).json({ error: false, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
