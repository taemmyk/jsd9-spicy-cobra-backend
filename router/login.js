import express from "express";

import { register, login, user } from "../controllers/login.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", user);
export default router;
