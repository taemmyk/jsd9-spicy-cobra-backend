import express from "express"
import {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} from "../controllers/orders.controller.js"

const router = express.Router()

router.get("/order",getAllOrder)
router.get("/order/:id",getOrderById)
router.post("/order",createOrder)
router.put("/order",updateOrder)
router.delete("/order/:id",deleteOrder)

export default router