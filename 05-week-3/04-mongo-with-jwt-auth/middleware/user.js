const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  try {
    const decodedValue = await jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (decodedValue.username) {
      req.username = decodedValue.username;
      req.user = user;
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

module.exports = userMiddleware;
