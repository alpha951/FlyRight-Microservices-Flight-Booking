const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Flight, Airplane, Airport } = require("../models");
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
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
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
        },
      ],
    });
    return flights;
  }
}

module.exports = FlightRepository;
