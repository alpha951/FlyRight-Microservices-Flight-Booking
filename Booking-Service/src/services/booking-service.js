const { BookingRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const { ServerConfig } = require("../config");
const { AppError } = require("../utils");
const { FLIGHT_SERVICE } = ServerConfig;

const db = require("../models");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    console.log("Requesting flight service...");

    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );

    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;
    console.log(totalBillingAmount);

    const bookingPayload = { ...data, totalCost: totalBillingAmount };

    const booking = await bookingRepository.create(bookingPayload, transaction);

    const response = await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    console.log("We are here inside catch block");
    console.log("first error", error.StatusCodes);
    await transaction.rollback();
    throw error;
  }
}

module.exports = { createBooking };
