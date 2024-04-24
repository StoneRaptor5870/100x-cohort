const { User } = require("../db/db.js");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(400).send({ message: "Invalid username or password" });
  }
  const user = await User.findOne({ username: username, password: password });
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  } else {
    req.user = user;
    next();
  }
}

module.exports = userMiddleware;