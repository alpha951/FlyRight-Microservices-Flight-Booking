const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateBooking(req, res, next) {
  if (!req.body.flightId) {
    ErrorResponse.message = "Failed to process booking";
    ErrorResponse.error = new AppError(
      ["flightId was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.userId) {
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

module.exports = { validateBooking, validatePayment };
