const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

// new instance of the AirportRepository class
const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      "Cannot create a new Airport Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function getAllAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Something went wrong while getting all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(data) {
  try {
    const airport = await airportRepository.get(data);
    return airport;
  } catch (error) {
    console.log("error in service is", error);
    Logger.error(error);

    if (error.statusCode == StatusCodes.NOT_FOUND) {
      console.log("Failing in service layer due to status code not found");
      throw new AppError(
        "The Airport you requested is not present in the database",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while getting airport by id",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested to delete is not present in the database",
        error.statusCode
      );
    }

    throw new AppError(
      "Something went wrong while getting all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "For the request you made, there is no airport / column available to update!",
        error.statusCode
      );
    } else if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      `The airport's data cannot be updated!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAllAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
