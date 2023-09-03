const express = require("express");
const router = express.Router();
const { AirplaneMiddlewares } = require("../../middlewares");

const { AirplaneController } = require("../../controllers");

router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest, // adding middleware
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAllAirplanes);

router.get("/:id", AirplaneController.getAirplane);

router.delete("/:id", AirplaneController.destroyAirplane);

router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
