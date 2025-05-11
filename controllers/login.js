import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const saltRounds = 10;
const router = express.Router();

export const register = async (req, res) => {
  const { email, password, birthday } = req.body;

  try {
    const database = client.db("game");
    const collection = database.collection("users");

    // เช็คว่า email มีอยู่แล้วหรือยัง
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await collection.insertOne({
      email,
      password: hashedPassword,
      birthday,
    });

    const accessToken = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "register successful",
      token: accessToken,
      refreshToken, 
    });
  } catch (error) {
    console.error("Register error:", error);
    res.json({
      success: false,
      message: "Register failed",
    });
  }
};

// login
export const login = async (req, res) => {
  console.log("req.body:", req.body);
  const { email, password } = req.body;
  try {
    const database = client.db("game");
    const collection = database.collection("users");

    const users = await collection.findOne({ email });
    console.log(users);

    if (!users) {
      return res.status(401).json({ message: "Invalid username or password1" });
    }

    const match = await bcrypt.compare(password, users.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password2" });
    }
    const accessToken = jwt.sign(
  { id: users._id, email: users.email }, // ใช้ _id แทน user_id
  process.env.SECRET,
  { expiresIn: "8h" }
);

    const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true,
      token: accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const user = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const database = client.db("game");
    const collection = database.collection("users");

    const user = await collection.findOne(
      { email: decoded.email },
      { projection: { password: 0 } } // ซ่อน password
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
console.log("JWT SECRET:", process.env.SECRET);

export default router;
