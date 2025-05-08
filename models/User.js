import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  status: { type: Boolean, required: true },
  createdAt: { type: Date, default: new Date().getTime() },
  LastActive: { type: Date, default: new Date() },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
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
