const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      req._id = data._id;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error verying token", error: error });
  }
}

module.exports = userMiddleware;
