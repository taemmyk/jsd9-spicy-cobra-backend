import { Schema, model } from "mongoose";

const GenreSchema = new Schema({
  genreName: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Genre name must be at least 3 characters long"],
    maxlength: [50, "Genre name cannot exceed 50 characters"],
  },
  genreDescription: { type: String, required: true },
});

export const Genre = model("Genre", GenreSchema);

/* -------------------------------------------------------------------------- */
/*         Example: Genre Document based on the Schema, from the Chat         */
/* -------------------------------------------------------------------------- */
// {
//     "genreName": "Adventures",
//     "genreDescription": "Embark on grand Adventures! Become the hero and step into incredible worlds! Solve hidden puzzles, meet fascinating characters, and immerse yourself in stories full of mystery and discovery! A new journey awaits!"
//     "__v": 0,
//     "_id": "647489c7e9a3b2f5d8c7f1a0"
// }
