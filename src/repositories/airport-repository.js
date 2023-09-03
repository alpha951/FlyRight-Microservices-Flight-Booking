const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Airport } = require("../models");

class AirportRepository extends CrudRepository {
  constructor() {
    super(Airport); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
}

module.exports = AirportRepository;
