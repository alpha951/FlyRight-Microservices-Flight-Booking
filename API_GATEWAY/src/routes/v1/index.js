const express = require("express");
const router = express.Router();

const { InfoController, UserControllers } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");
const userRoutes = require("./user-routes");

// auth middleware added for testing purposes
router.get("/info", AuthMiddlewares.checkAuth, InfoController.info);

router.use("/user", userRoutes);

module.exports = router;
