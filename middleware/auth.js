import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

export const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Access denied. No Token",
    });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      user: { _id: decoded_token.userId },
      email: decoded_token.email,
    };
    next();
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";
    res.status(401).json({
      error: true,
      code: isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      message: isExpired
        ? "Token has expired, please log in again"
        : "Invalid token.",
    });
  }
};
