const express = require("express");
const router = express.Router();

const { InfoController } = require("../../controllers");

router.get("/info", InfoController.info);

module.exports = router;
