const express = require("express");
const router = express.Router();
const { FlightMiddlewares } = require("../../middlewares");

const { FlightController } = require("../../controllers");

// /api/v1/Flights POST

router.post(
  "/",
  FlightMiddlewares.validateCreateRequest, // adding middleware
  FlightController.createFlight
);

// // /api/v1/Flights GET
// router.get("/", FlightController.getAllFlights);

// // /api/v1/Flights/:id GET
// router.get("/:id", FlightController.getFlight);

// // /api/v1/Flights/:id DELETE
// router.delete("/:id", FlightController.destroyFlight);

// // /api/v1/Flights/:id PATCH
// router.patch("/:id", FlightController.updateFlight);

module.exports = router;
