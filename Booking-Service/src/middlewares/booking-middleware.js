const { StatusCodes } = require("http-status-codes");
const { Auth } = require("../utils/common");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function deCipherUserInfo(req, res, next) {
  const response = Auth.verifyToken(req.headers["x-access-token"]);
  req.user = response;
  console.log("req.user", req.user);
  next();
}

function validateBooking(req, res, next) {
  console.log("REQUEST INSIDE BOOKING_MIDDLEWARE", req.body);
  if (!req.body.flightId) {
    ErrorResponse.message = "Failed to process booking";
    ErrorResponse.error = new AppError(
      ["flightId was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.user.id) {
    ErrorResponse.message = "Failed to process booking";
    ErrorResponse.error = new AppError(
      ["userId was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.noOfSeats) {
    ErrorResponse.message = "Failed to process booking";
    ErrorResponse.error = new AppError(
      ["userId was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validatePayment(req, res, next) {
  if (!req.headers["idempotent-key"]) {
    ErrorResponse.message = "Failed to process payment";
    ErrorResponse.error = new AppError(
      ["Idempotent key is missing incoming request headers"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = { validateBooking, validatePayment, deCipherUserInfo };
