const express = require("express");
const router = express.Router();

const { InfoController, UserControllers } = require("../../controllers");
const userRoutes = require("./user-routes");

router.get("/info", InfoController.info);

router.use("/signup", userRoutes);

module.exports = router;
