import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  confirmPassword: { type: String, require: true },
  role: { type: [String], enum: ["user", "dev", "admin"], default: "user" },
  status: { type: Boolean, default: true },
  createdOn: { type: Date, default: new Date().getTime() },
  lastlogin: { type: Date, default: new Date().getTime() },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  // salt => กำหนดให้เข้ารหัสกี่รอบ ปกติ 10 รอบ
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model("User", UserSchema);