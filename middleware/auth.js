import jwt from "jsonwebtoken";
import User from "../models/user.js"

export const authenticate = async (req, res, next) => {
  console.log("test mideleware")
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("decoded>>>>",decoded)
    req.user = await User.findById(decoded.id).select("-password");
    if (!User) return res.status(401).json({ message: "Invalid token" });

    req.user = User;
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};




export default authenticate;
