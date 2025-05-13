import express from "express";
import {  verifyAuthToken } from "../middleware/auth.js"
import {
  getAlluser,
  getuserById,
  newuser,
  updateuser,
  deleteuser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAlluser);
router.get("/:id",getuserById);
router.post("/", newuser);
router.put("/:id", updateuser);
router.delete("/:id", deleteuser);
router.get("/user", verifyAuthToken ,
  (req, res) => {
  res.json(req.user); 
});

export default router;
