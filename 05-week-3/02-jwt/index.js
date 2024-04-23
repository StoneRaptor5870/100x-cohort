"use strict";
const jwt = require("jsonwebtoken");
const z = require("zod");
const jwtPassword = "radiohead";
function signJwt(username, password) {
    if (!username.includes("@"))
        return null;
    if (password.length < 6)
        return null;
    const token = jwt.sign({ username: username, password: password }, jwtPassword);
    return token;
}
