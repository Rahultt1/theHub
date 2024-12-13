const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's details to req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Error with token authorization:", error.message);
      return res.status(401).json({ message: "Not Authorized, Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Not Authorized, No Token Provided" });
  }
};

module.exports = { protect };