"use strict";
/** @type {import('sequelize-cli').Migration} */

const { Enums } = require("../utils/common");
const { BOOKED, PENDING, INITIATED, CANCELLED } = Enums.BOOKING_STATUS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: [BOOKED, PENDING, INITIATED, CANCELLED],
        defaultValue: INITIATED,
        allowNull: false,
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
