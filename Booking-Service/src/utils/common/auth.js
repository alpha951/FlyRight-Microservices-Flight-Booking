const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");


function verifyToken(token) {
  try {
    const response = jwt.verify(token, ServerConfig.JWT_SECRET);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { checkPassword, createToken, verifyToken };
