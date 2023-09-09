const { TicketRepository } = require("../repositories");
const { mailsender } = require("../config");

const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
  try {
    const response = await mailsender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepo.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getpendingEmails() {
  try {
    const response = await ticketRepo.getPendingTickets();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { sendEmail, createTicket, getpendingEmails };
