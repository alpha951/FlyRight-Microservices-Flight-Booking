const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Flight } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight); // calling the constructor of the parent class to inherit all methods from it
  }
  // here we can add more methods that are specific to this entity
}

module.exports = FlightRepository;
