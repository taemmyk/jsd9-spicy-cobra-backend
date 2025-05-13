import Genre from '../models/Genre.js';
import Product from '../models/products.js';
const newProduct = async (req, res) => {
  try {
    const genreNames = req.body.genres; // ["Action", "Roguelike"]
    const genres = await Genre.find({ name: { $in: genreNames } });

    const genreIds = genres.map(genre => genre._id);

    const product = new Product({
      ...req.body,
      genres: genreIds
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export default newProduct