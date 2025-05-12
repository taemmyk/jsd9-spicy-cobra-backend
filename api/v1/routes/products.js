import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

export default () => router;
