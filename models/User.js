import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  status: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date().getTime() },
  LastActive: { type: Date, default: new Date() },
});

export const User = model("User", UserSchema);

/* -------------------------------------------------------------------------- */
/*          Example: User Document based on the Schema, from the Chat         */
/* -------------------------------------------------------------------------- */
// {
//     "email": "john.doe@example.com",
//     "password": "hashed_password_here",
//     "role": "user",
//     "status": true, // Active or Inactive
//     "createdAt": "2024-07-15T12:00:00.000Z",
//     "LastActive": "2024-07-15T12:00:00.000Z",
//     "_id": "6695cb081234567890abcdef",
//     "__v": 0
// }