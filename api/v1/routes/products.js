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
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/search", searchProducts);

router.get("/:id", getProductByProductId);

router.get("/games/:slug", getProductBySlug);

router.get("/genre/id/:genreId", getProductsByGenreId);

router.get("/genre/:genreName", getProductsByGenreName);

router.post("/", authUser, createProduct);

router.put("/:id", authUser, updateProductById);

router.delete("/:id", authUser, deleteProductById);

export default () => router;
