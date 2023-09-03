const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

/*
flightNumber: req.body.flightNumber,
airplaneId: req.body.airplaneId,
departureAirportId: req.body.departureAirportId,
arrivalAirportId: req.body.arrivalAirportId,
arrivalTime: req.body.arrivalTime,
departureTime: req.body.departureTime,
price: req.body.price,
boardingGate: req.body.boardingGate,
totalSeats: req.body.totalSeats,

*/
function validateCreateRequest(req, res, next) {
  const {
    flightNumber,
    airplaneId,
    departureAirportId,
    arrivalAirportId,
    arrivalTime,
    departureTime,
    price,
    boardingGate, // allowNull: true,
    totalSeats,
  } = req.body;

  if (
    flightNumber &&
    airplaneId &&
    departureAirportId &&
    arrivalAirportId &&
    arrivalTime &&
    departureTime &&
    price &&
    totalSeats
  ) {
    return next();
  }

  ErrorResponse.message = "Something went wrong while creating flight";

  if (!flightNumber) {
    ErrorResponse.explanation =
      "flightNumber data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!airplaneId) {
    ErrorResponse.explanation = "airplaneId data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!departureAirportId) {
    ErrorResponse.explanation =
      "departureAirportId data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!arrivalAirportId) {
    ErrorResponse.explanation =
      "arrivalAirportId data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!arrivalTime) {
    ErrorResponse.explanation =
      "arrivalTime data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!departureTime) {
    ErrorResponse.explanation =
      "departureTime data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!price) {
    ErrorResponse.explanation = "price data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!totalSeats) {
    ErrorResponse.explanation = "totalSeats data not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

module.exports = { validateCreateRequest };
