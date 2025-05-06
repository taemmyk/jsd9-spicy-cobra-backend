import express from "express"
import {
    getAllOrder,
    getOrderById,
    newOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/orders.js"

const router = express.Router()

router.get("/",getAllOrder)
router.get("/:id",getOrderById)
router.post("/",newOrder)
router.put("/:id",updateOrder)
router.delete("/:id",deleteOrder)

export default router