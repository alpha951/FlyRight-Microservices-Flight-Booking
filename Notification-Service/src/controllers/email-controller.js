const { StatusCodes } = require("http-status-codes");

const { emailService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function create(req, res) {
  try {
    const response = await emailService.createTicket({
      recipientEmail: req.body.recipientEmail,
      subject: req.body.subject,
      content: req.body.content,
    });
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log("Found error obj inside email controller -----", error);
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}

async function sendEmail(req, res) {
  try {
    const response = await emailService.sendEmail({
      recipientEmail: req.body.recipientEmail,
      subject: req.body.subject,
      content: req.body.content,
    });
    SuccessResponse.data = response;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log("Found error obj inside email controller -----", error);
    return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(ErrorResponse);
  }
}

module.exports = { create, sendEmail };
