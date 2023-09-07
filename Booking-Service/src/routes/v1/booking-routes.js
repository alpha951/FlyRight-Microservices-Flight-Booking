const { BookingController } = require("../../controllers");

const express = require("express");
const router = express.Router();

router.post("/", BookingController.createBooking);

module.exports = router;
