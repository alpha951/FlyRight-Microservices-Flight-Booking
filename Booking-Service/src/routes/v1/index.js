const express = require("express");
const router = express.Router();

const { InfoController } = require("../../controllers");

const bookingRoutes = require("./booking-routes");
const { BookingMiddlewares } = require("../../middlewares");

router.get("/info", InfoController.info);

router.use("/booking", BookingMiddlewares.deCipherUserInfo, bookingRoutes);

module.exports = router;
