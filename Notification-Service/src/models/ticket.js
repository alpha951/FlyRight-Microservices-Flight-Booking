"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "BOOKED", "CANCELLED"],
        defaultValue: "PENDING",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
