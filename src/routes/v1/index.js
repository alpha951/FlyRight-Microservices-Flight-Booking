const express = require("express");
const router = express.Router();

const { InfoController } = require("../../controllers");
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airPortRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");

// API info
router.get("/info", InfoController.info);

// API routes
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airPortRoutes);
router.use("/flights", flightRoutes);

module.exports = router;
