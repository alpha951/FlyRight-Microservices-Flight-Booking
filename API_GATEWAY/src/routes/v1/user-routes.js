const express = require("express");
const router = express.Router();

const { UserControllers } = require("../../controllers");

router.post("/", UserControllers.createUser);

module.exports = router;
