const { BookingRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const { ServerConfig } = require("../config");
const { AppError } = require("../utils");
const { FLIGHT_SERVICE } = ServerConfig;

const { Queue } = require("../config");

const db = require("../models");

const { Enums, EmailTemplate } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();

const { Sequelize, QueryTypes } = require("sequelize");

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    console.log("Requesting flight service...");
    // ! Fetching data from FLIGHT MICROSERVICE using Axios
    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );

    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;
    console.log(totalBillingAmount);

    const bookingPayload = {
      flightId: data.flightId,
      noOfSeats: data.noOfSeats,
      userId: data.userInfo.id,
      totalCost: totalBillingAmount,
    };

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
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );

    if (bookingDetails.status === CANCELLED) {
      throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.userId != data.userInfo.id) {
      throw new AppError("User Id does not match", StatusCodes.BAD_REQUEST);
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 300000) {
      await cancelBooking(data);
      throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new AppError(
        "Payment amount does not match with totalCost",
        StatusCodes.BAD_REQUEST
      );
    }

    if (bookingDetails.userId != data.userInfo.id) {
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

    /*
      todo : Send email to user
      */
    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`
    );
    const flightData = flight.data.data;
    // Removing DB query to get the user-info rather using jwt-token info
    // ! Making DB Query using Sequelize
    /*
    const user = await db.sequelize.query(
      `SELECT * FROM Users WHERE id = ${data.userId}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    */
    Queue.sendData({
      recipientEmail: data.userInfo.email,
      html: EmailTemplate.BookingMailTemplate(
        bookingDetails.flightId,
        bookingDetails.noOfSeats,
        flightData,
        data.userInfo.email
      ),
      text: "it's a plain text since html is not working",
      subject: `Confirmation : Your flight has been booked for Booking-Id : ${data.bookingId} - FlyRight Airlines`,
      status: "BOOKED",
    });
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
    // If booking status is already cancelled
    if (bookingDetails.status === CANCELLED) {
      await transaction.commit();
      return true;
    }

    if (bookingDetails.userId != data.userInfo.id) {
      throw new AppError("User Id does not match", StatusCodes.BAD_REQUEST);
    }

    // making a call to flight service to increase the seats
    await axios.patch(
      `${FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: 0,
      }
    );
    // marking the booking as cancelled
    await bookingRepository.update(
      data.bookingId,
      { status: CANCELLED },
      transaction
    );

    const flight = await axios.get(
      `${FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}`
    );
    const flightData = flight.data.data;

    // Avoiding DB query to get user info rather using decipher info from jwt
    /*
    const user = await db.sequelize.query(
      `SELECT * FROM Users WHERE id = ${data.userId}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    */
    Queue.sendData({
      recipientEmail: data.userInfo.email,
      html: EmailTemplate.CancelBookingMailTemplate(
        bookingDetails.flightId,
        bookingDetails.noOfSeats,
        flightData,
        data.userInfo.email
      ),
      text: "it's a plain text since html is not working",
      subject: `Cancellation : Your flight has been cancelled for Booking-Id : ${data.bookingId} - FlyRight Airlines`,
      status: "CANCELLED",
    });
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

async function getAllBookings(userId) {
  try {
    const response = await bookingRepository.getAllBookings(userId);
    return response;
  } catch (error) {
    console.log("Error in Booking-service getAllBookings", error);
    if (error instanceof AppError) {
      throw error;
    }
    throw error;
  }
}

module.exports = {
  createBooking,
  makePayment,
  cancelOldBookings,
  getAllBookings,
  cancelBooking,
};
