import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    address: { type: String },
    created_at: { type: Date },
    last_login: { type: Date },
    role: { type: String, enum: ["user", "dev", "admin"] },
    status: { type: Boolean, default: true },
   
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const user = mongoose.model("User", userSchema);
export default user;
