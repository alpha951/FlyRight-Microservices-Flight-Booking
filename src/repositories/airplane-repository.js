const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
}

module.exports = AirplaneRepository;
