import express from "express";
import {
  getAllProducts,
  getProductByProductId,
  getProductByGenreId,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductByProductId);

router.get("/genre/:genreId", getProductByGenreId);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

export default () => router;
