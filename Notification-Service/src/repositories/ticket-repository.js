const { StatusCodes } = require("http-status-codes");
const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");
const { Op } = require("sequelize");
const { Enums } = require("../utils/common");
const { AppError } = require("../utils");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {
    try {
      const response = await Ticket.findAll({
        where: {
          status: Enums.TICKET_STATUS.PENDING,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTodaysTickets(today) {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const tickets = await Ticket.findAll({
        where: {
          departureTime: {
            [Op.gte]: today,
            [Op.lt]: tomorrow,
          },
          status: "BOOKED", // You may adjust this based on your status criteria
        },
      });
      return tickets;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
