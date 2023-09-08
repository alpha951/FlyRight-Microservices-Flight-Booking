const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Email data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while authenticating";
    ErrorResponse.explanation = "Password not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateAuthRequest };
