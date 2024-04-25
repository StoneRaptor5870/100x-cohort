const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const token = req.headers.authorization; // bearer token
  const words = token.split(" "); // ["Bearer", "token"]
  const jwtToken = words[1]; // token
  try {
    const decodedValue = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (decodedValue.username) {
      req.admin = admin;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (error) {
    res.json({
      msg: "Incorrect inputs",
    });
  }
}

module.exports = adminMiddleware;