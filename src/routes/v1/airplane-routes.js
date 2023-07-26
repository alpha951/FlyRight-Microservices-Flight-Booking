const express = require("express");
const router = express.Router();
const { airplaneMiddleware } = require("../../middlewares");

const { airplaneController } = require("../../controllers");

router.post(
  "/",
  airplaneMiddleware.validateCreateRequest, // adding middleware
  airplaneController.createAirplane
);

router.get("/", airplaneController.getAllAirplanes);

router.get("/:id", airplaneController.getAirplane);

router.delete("/:id", airplaneController.destroyAirplane);

module.exports = router;
