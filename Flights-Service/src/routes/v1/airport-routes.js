const express = require("express");
const router = express.Router();
const { AirportMiddlewares } = require("../../middlewares");

const { AirportController } = require("../../controllers");

// /api/v1/airports POST

router.post(
  "/",
  AirportMiddlewares.validateCreateRequest, // adding middleware
  AirportController.createAirport
);

// /api/v1/airports GET
router.get("/", AirportController.getAllAirports);

// /api/v1/airports/:id GET
router.get("/:id", AirportController.getAirport);

// /api/v1/airports/:id DELETE
router.delete("/:id", AirportController.destroyAirport);

// /api/v1/airports/:id PATCH
router.patch("/:id", AirportController.updateAirport);

module.exports = router;
