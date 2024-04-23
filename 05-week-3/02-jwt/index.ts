const jwt = require("jsonwebtoken");
const z = require("zod");
const jwtPassword = "radiohead";

function signJwt(username: string, password: string): string | null {
  if (!username.includes("@")) return null;
  if (password.length < 6) return null;
  const token = jwt.sign(
    {username: username, password: password},
    jwtPassword
  );
  return token;
}

function verifyJwt(token: string) {
  try {
    const isValid = jwt.verify(token, jwtPassword);
    if (isValid) return true;
  } catch (error) {
    return false;
  }
}

function decodeJwt(token: string) {
  const decoded = jwt.decode(token);
  if (!decoded) return false;
  return true;
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};