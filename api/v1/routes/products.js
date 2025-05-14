import express from "express";
import {
  getAllProducts,
  getProductByProductId,
  getProductBySlug,
  getProductsByGenreId,
  getProductsByGenreName,
  searchProducts,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/search", searchProducts);

router.get("/:id", getProductByProductId);

router.get("/games/:slug", getProductBySlug);

// router.get("/genre/:genreId", getProductsByGenreId);
router.get("/genre/:genreName", getProductsByGenreName);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

export default () => router;
