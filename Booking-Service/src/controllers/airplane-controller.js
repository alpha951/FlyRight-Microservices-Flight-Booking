const { Logger } = require("../config");
const { AirplaneService } = require("../services/");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const { modelNumber, capacity } = req.body;
    console.log(modelNumber, capacity);
    const airplane = await AirplaneService.createAirplane({
      modelNumber: modelNumber,
      capacity: capacity,
    });

    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.status).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
