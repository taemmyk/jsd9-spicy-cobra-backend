import { Genre } from "../../../models/Genre.js";

export const getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

export const getGenreById = async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    const genre = await Genre.findOne({ _id: genreId });
    if (!genre) {
      return res.status(404).json({ error: "Genre not found" });
    }
    res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};

export const createGenre = async (req, res, next) => {
  const { genreName, genreDescription } = req.body;

  if (!genreName || genreName.trim() === "") {
    return res
      .status(400)
      .json({ error: true, message: "Genre name is required." });
  }

  if (genreName.length < 2 || genreName.length > 50) {
    return res.status(400).json({
      error: true,
      message: "Genre name must be between 2 and 50 characters.",
    });
  }

  try {
    const newGenre = new Genre({
      genreName,
      genreDescription,
    });
    const savedGenre = await newGenre.save();
    res.status(201).json(savedGenre);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res
        .status(400)
        .json({ error: "Validation Error", message: errors.join(", ") });
    }
    next(error);
  }
};

export const updateGenreDetailById = async (req, res, next) => {
  const { genreId } = req.params;
  const { genreName, genreDescription } = req.body;

  if (!genreName || genreName.trim() === "") {
    return res
      .status(400)
      .json({ error: true, message: "Genre name is required." });
  }

  if (genreName.length < 2 || genreName.length > 50) {
    return res.status(400).json({
      error: true,
      message: "Genre name must be between 2 and 50 characters.",
    });
  }

  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      genreId,
      { genreName, genreDescription },
      { new: true, runValidators: true }
    );

    if (!updatedGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.status(200).json(updatedGenre);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el) => el.message);
      return res
        .status(400)
        .json({ error: "Validation Error", message: errors.join(", ") });
    }
    next(error);
  }
};

export const deleteGenreById = async (req, res, next) => {
  const { genreId } = req.params;

  try {
    const deletedGenre = await Genre.findByIdAndDelete(genreId);

    if (!deletedGenre) {
      return res.status(404).json({ error: "Genre not found" });
    }

    res.status(204).json({ error: false, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
