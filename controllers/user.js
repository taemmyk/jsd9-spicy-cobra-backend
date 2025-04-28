import express from "express"
import {
getAllUser,
getUserById,
createUser,
updateUser,
deleteUser,
} from "../controllers/user.controller.js"

const router = express.Router()

router.get("/Users",getAllUser)
router.get("/Users/:id",getUserById)
router.post("/Users",createUser)
router.put("/Users/:id",updateUser)
router.delete("/Users/:id",deleteUser)

export default router 