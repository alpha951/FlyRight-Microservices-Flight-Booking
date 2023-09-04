const express = require("express");
const router = express.Router();
const { airplaneMiddleware } = require("../../middlewares");

const { airplaneController } = require("../../controllers");

router.post(
  "/",
  airplaneMiddleware.validateCreateRequest,  // adding middleware
  airplaneController.createAirplane
);

module.exports = router;
