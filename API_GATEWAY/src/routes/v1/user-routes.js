const express = require("express");
const router = express.Router();

const { UserControllers } = require("../../controllers");
const { AuthMiddlewares } = require("../../middlewares");

router.post(
  "/signup",
  AuthMiddlewares.validateAuthRequest,
  UserControllers.signup
);

router.post(
  "/signin",
  AuthMiddlewares.validateAuthRequest,
  UserControllers.signin
);

module.exports = router;
