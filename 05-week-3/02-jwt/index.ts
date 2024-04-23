const jwt = require("jsonwebtoken");
const z = require("zod");
const jwtPassword = "radiohead";

function signJwt(username: string, password: string): string | null {
  if (username.includes("@")) return null;
  if (password.length < 6) return null;
  const token = jwt.sign(
    {username: username, password: password},
    jwtPassword
  );
  return token;
}

const token = signJwt("zzz@gmail.com", "sedrf4");
console.log(token);