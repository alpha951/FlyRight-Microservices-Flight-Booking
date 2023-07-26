const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const result = await this.model.create(data);
    return result;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }

    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    const tableAttributes = Object.keys(this.model.rawAttributes);
    const reqAttributes = Object.keys(data);
    const hasAllAttributes = reqAttributes.every((elem) =>
      tableAttributes.includes(elem)
    );
    if (hasAllAttributes) {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });

      if (response[0] == 0) {
        throw new AppError(
          "The data for the given ID could not be found",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } else {
      throw new AppError(
        "The column for the given ID could not be found",
        StatusCodes.NOT_FOUND
      );
    }
  }
}

module.exports = CrudRepository;
