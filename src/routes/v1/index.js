const express = require('express');
const router = express.Router();

const { InfoController } = require("../../controllers");
const airplaneRoutes  = require("./airplane-routes");
const cityRoutes = require("./city-routes");

router.get("/info", InfoController.info);
router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);

module.exports = router;

