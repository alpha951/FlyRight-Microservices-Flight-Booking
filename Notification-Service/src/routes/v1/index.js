const express = require("express");
const router = express.Router();

const { InfoController, EmailControllers } = require("../../controllers");

router.get("/info", InfoController.info);

router.post("/tickets", EmailControllers.create);

module.exports = router;
