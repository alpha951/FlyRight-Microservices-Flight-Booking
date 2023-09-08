const { BookingRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const { ServerConfig } = require("../config");
const { AppError } = require("../utils");
const { FLIGHT_SERVICE } = ServerConfig;

const db = require("../models");

const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED } = Enums.BOOKING_STATUS;

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

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    console.log(data);
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );

    if (bookingDetails.status === CANCELLED) {
      throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data.bookingId);
      throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new AppError(
        "Payment amount does not match with totalCost",
        StatusCodes.BAD_REQUEST
      );
    }

    if (bookingDetails.userId != data.userId) {
      throw new AppError("User Id does not match", StatusCodes.BAD_REQUEST);
    }

    // Assuming payment is successuful
    console.log("bookingId is inside booking-service ", data.bookingId);
    const response = await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      transaction
    );
    console.log("response inside booking/payment service", response);
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );
    if (bookingDetails.status === CANCELLED) {
      await transaction.commit();
      return true;
    }

    await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: 0,
      }
    );
    await bookingRepository.update(
      data.bookingId,
      { status: CANCELLED },
      transaction
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelOldBookings() {
  try {
    const currentDate = new Date(Date.now() - 1000 * 300); // 5 minutes ago datetime
    const response = await bookingRepository.cancelOldBookings(currentDate);
    return response;
  } catch (error) {
    console.log("Error in Booking-service cancelOldBookings", error);
  }
}

module.exports = { createBooking, makePayment, cancelOldBookings };
