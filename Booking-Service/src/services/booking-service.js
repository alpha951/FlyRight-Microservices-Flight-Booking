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

    if (flight.status != 200) {
      // Handle the unexpected response status code from the flight service
      console.log("Error statuscode flight service...");
      throw new Error(`Flight service returned status ${response.status}`);
    }

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

    if (response.status !== 200) {
      console.log("Error statuscode response ...");

      // Handle the unexpected response status code from the flight service
      throw new Error(`Flight service returned status ${response.status}`);
    }

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { createBooking };
