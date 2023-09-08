const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");

const db = require("../models");
const { addRowLock } = require("./queries");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight); // calling the constructor of the parent class to inherit all methods from it
  }
  // here we can add more methods that are specific to this entity
  async getAllFlights(filter, sort) {
    const flights = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",

          /*
           !imp we need to explicity define the on clause to join the tables since `departureAirport.code` (which is the foreign key) is not the primary key of the Airport table while in case of Airplane table `airplaneId` is the primary key
          */
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return flights;
  }

  async updateRemainingSeats(flightId, seats, dec = 1) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLock(flightId));
      /**
       * Sequelize provides a way to increment/decrement a column value by a given number
       * const incrementResult = await jane.increment('age', { by: 2 });
       *  https://sequelize.org/docs/v6/core-concepts/model-instances/#incrementing-and-decrementing-integer-values
       */
      const flight = await Flight.findByPk(flightId);
      console.log("dec", dec);
      console.log(typeof dec);
      if (dec == 1 || dec == "1" || dec == true || dec == "true") {
        await flight.decrement(
          "totalSeats",
          {
            by: seats,
          },
          {
            transaction: transaction,
          }
        );
      } else {
        await flight.increment(
          "totalSeats",
          {
            by: seats,
          },
          {
            transaction: transaction,
          }
        );
      }
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
