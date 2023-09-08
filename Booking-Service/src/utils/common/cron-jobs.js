const cron = require("node-cron");

// const { BookingService } = require("../../services");

function scheduleCrons(BookingService) {
  cron.schedule("*/30 * * * *", async () => {
    await BookingService.cancelOldBookings();
  });
}

module.exports = scheduleCrons;
