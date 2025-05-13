// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; // Adjust the path to your User model

/**
 * Middleware to verify JWT and attach user to request.
 * - Expects a Bearer token in the Authorization header.
 * - Verifies the token using process.env.SECRET.
 * - Fetches user from DB using the ID in the token.
 * - Attaches user object (excluding password) to req.user.
 * - Responds with 401 if authentication fails at any point.
 */
export const verifyAuthToken = async (req, res, next) => {
  console.log("Attempting to authenticate request...");
  let token;

  // Check for Authorization header and Bearer token format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer <token>" -> "<token>")
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        console.log("No token found after 'Bearer ' prefix.");
        return res.status(401).json({ message: "No token provided, authorization denied." });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log("Token decoded:", decoded);

      // Get user from the token's ID and attach to request object
      // Exclude password from the user object
      const foundUser = await User.findById(decoded.id || decoded.userId).select("-password"); // Use decoded.id or decoded.userId based on your JWT payload

      if (!foundUser) {
        console.log("User not found for ID in token:", decoded.id || decoded.userId);
        return res.status(401).json({ message: "User not found, authorization denied." });
      }

      req.user = foundUser; // Attach the found user object to the request
      console.log("User authenticated:", req.user.email || req.user.username); // Log some user identifier
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Authentication error:", error.message);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token, authorization denied." });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired, authorization denied." });
      }
      return res.status(401).json({ message: "Not authorized, token failed." });
    }
  } else {
    console.log("No Authorization header with Bearer token found.");
    return res.status(401).json({ message: "No token provided, authorization denied." });
  }
};

// You can still export it as default if you only have one main auth function
// export default verifyAuthToken;
