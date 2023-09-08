const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });
    SuccessResponse.data = booking;
    console.log("first response", SuccessResponse);
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(
      "Found error obj inside booking controller -----",
      error.statusCode
    );
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}

async function makePayment(req, res) {
  try {
    const booking = await BookingService.makePayment({
      bookingId: req.body.bookingId,
      userId: req.body.userId,
      totalCost: req.body.totalCost,
    });
    SuccessResponse.data = booking;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(
      "Found error obj inside booking/makePayment controller -----",
      error
    );
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}

module.exports = { createBooking, makePayment };
