import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hash_password: { type: String, required: true },
    birthday: { type: Date },
    address: { type: String },
    created_at: { type: Date },
    last_login: { type: Date },
    role: { type: String, enum: ["user", "dev", "admin"] },
    status: { type: Boolean, default: true },
   
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
