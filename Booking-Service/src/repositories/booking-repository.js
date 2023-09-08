const { StatusCodes } = require("http-status-codes");

const CrudRepository = require("./crud-repository");
const { Booking } = require("../models");

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data) {
    const response = await this.model.create(data, {
      transaction: transaction,
    });
    return response;
  }
}

module.exports = BookingRepository;
