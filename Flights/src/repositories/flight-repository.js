const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");

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
    /**
     * Sequelize provides a way to increment/decrement a column value by a given number
     * const incrementResult = await jane.increment('age', { by: 2 });
     *  https://sequelize.org/docs/v6/core-concepts/model-instances/#incrementing-and-decrementing-integer-values
     */
    console.log("FLIGHID is ", flightId);
    const flight = await Flight.findByPk(flightId);
    if (dec) {
      await flight.decrement("totalSeats", {
        by: 2,
      });
    } else {
      await flight.increment("totalSeats", {
        by: seats,
      });
    }
    return flight;
  }
}

module.exports = FlightRepository;
