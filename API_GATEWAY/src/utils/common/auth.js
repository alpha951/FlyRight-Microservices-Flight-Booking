const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");
const AppError = require("../errors/app-error");
const { StatusCodes } = require("http-status-codes");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

function createToken(input) {
  try {
    const token = jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
    return token;
  } catch (error) {
    throw error;
  }
}

function verifyToken(token) {
  try {
    const response = jwt.verify(token, ServerConfig.JWT_SECRET);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { checkPassword, createToken, verifyToken };
