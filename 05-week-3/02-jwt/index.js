"use strict";
const jwt = require("jsonwebtoken");
const z = require("zod");
const jwtPassword = "radiohead";
function signJwt(username, password) {
    if (username.includes("@"))
        return null;
    if (password.length < 6)
        return null;
    const token = jwt.sign({ username: username, password: password }, jwtPassword);
    return token;
}
function verifyJwt(token) {
    try {
        const isValid = jwt.verify(token, jwtPassword);
        if (isValid)
            return true;
    }
    catch (error) {
        console.log(error);
    }
    return false;
}
function decodeJwt(token) {
    const decoded = jwt.decode(token);
    if (decoded)
        return decoded;
    else
        return false;
}
