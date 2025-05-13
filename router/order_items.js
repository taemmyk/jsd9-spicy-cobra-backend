import verifyToken from "../middleware/verifyToken.js";
import express from "express";
import {
  getOrderitem,
  getOrder_itemsById,
  neworder_items
} from "../controllers/order_items.js"

const router = express.Router();

router.get("/", getOrderitem)
router.get("/:id",verifyToken,getOrder_itemsById)
router.post("/",neworder_items)
router.get("/", verifyToken, getOrderitem);
export default router;