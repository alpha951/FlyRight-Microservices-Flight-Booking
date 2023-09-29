const { BookingController } = require("../../controllers");
const { BookingMiddlewares } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/",
  BookingMiddlewares.validateBooking,
  BookingController.createBooking
);

router.post(
  "/payment",
  BookingMiddlewares.validatePayment,
  BookingController.makePayment
);

router.post("/cancel/:bookingId", BookingController.cancelBooking);

router.get("/:userId", BookingController.getAllBookings);

module.exports = router;
