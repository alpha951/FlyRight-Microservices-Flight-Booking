const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
  GMAIL_ID: process.env.GMAIL_ID,
  GMAIL_PASS: process.env.GMAIL_PASS,
};
