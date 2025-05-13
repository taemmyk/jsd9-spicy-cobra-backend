import express from "express";
import userRoutes from "./routes/users.js";

export default () => {
  const router = express.Router();
  router.use(userRoutes);
  return router;
};
