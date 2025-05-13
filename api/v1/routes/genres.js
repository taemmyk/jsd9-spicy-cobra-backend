import express from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenreDetailById,
  deleteGenreById,
} from "../controllers/genreController.js";

const router = express.Router();
router.get("/", getAllGenres);
router.get("/:genreId", getGenreById);
router.post("/", createGenre);
router.put("/:genreId", updateGenreDetailById);
router.delete("/:genreId", deleteGenreById);

export default () => router;
