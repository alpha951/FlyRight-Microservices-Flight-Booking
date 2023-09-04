const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

// new instance of the AirplaneRepository class
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    Logger.error("AirplaneService: Error creating airplane");
    if (error.name == "TypeError") {
      throw new AppError(
        "Something went wrong while creating airplane",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
}

module.exports = {
  createAirplane,
};
