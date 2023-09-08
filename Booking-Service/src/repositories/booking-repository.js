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

  async get(data, transaction) {
    const response = await this.model.findByPk(data, {
      transaction: transaction,
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async update(id, data, transaction) {
    console.log("Inside booking repository entering");
    console.log(id, data);
    const response = await this.model.update(
      data,
      {
        where: { id: id },
      },
      { transaction: transaction }
    );
    console.log("Inside booking repository update", response);
    return response;
  }
}

module.exports = BookingRepository;
