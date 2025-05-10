import express from "express";
import { Genre } from "../../../models/Genre.js";

const router = express.Router();

export default () => {
  router.get("/", async (req, res) => {
    try {
      const genres = await Genre.find();
      res.status(200).json(genres);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  router.post("/", async (req, res) => {
    const { genreName, genreDescription } = req.body;

    if (!genreName || genreName.trim() === "") {
      return res.status(400).json({ error: "Bad Request", message: "Genre name is required." });
    }

    if (genreName.length < 2 || genreName.length > 50) {
      return res.status(400).json({ error: "Bad Request", message: "Genre name must be between 2 and 50 characters." });
    }

    if (genreDescription && genreDescription.length > 200) {
      return res.status(400).json({ error: "Bad Request", message: "Genre description cannot exceed 200 characters." });
    }

    try {
      const newGenre = new Genre({
        genreName,
        genreDescription,
      });
      const savedGenre = await newGenre.save();
      res.status(201).json(savedGenre);
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors
        const errors = Object.values(error.errors).map(el => el.message);
        return res.status(400).json({ error: "Validation Error", message: errors.join(', ') });
      }
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  });

  router.get("/:genreId", async (req, res) => {
    try {
        const genreId = req.params.genreId;
        const genre = await Genre.findOne({ _id: genreId });
        if (!genre) { return res.status(404).json({ error: "User not found"})}
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message})
    }
  });

  return router;
};