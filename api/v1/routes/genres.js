import express from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreDetailById,
  deleteGenreById,
} from "../controllers/genreController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();
router.get("/", getAllGenres);
router.get("/:genreId", getGenreById);
router.post("/", authUser, createGenre);
router.put("/:genreId", authUser, updateGenreDetailById);
router.delete("/:genreId", authUser, deleteGenreById);

export default () => router;
