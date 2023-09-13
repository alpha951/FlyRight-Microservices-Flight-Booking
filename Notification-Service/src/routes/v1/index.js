const express = require("express");
const router = express.Router();

const { InfoController, EmailControllers } = require("../../controllers");

const { ticketMiddlewares } = require("../../middlewares/index");

router.get("/info", InfoController.info);

router.post(
  "/tickets",
  ticketMiddlewares.validateCreateRequest,
  EmailControllers.create
);

module.exports = router;
