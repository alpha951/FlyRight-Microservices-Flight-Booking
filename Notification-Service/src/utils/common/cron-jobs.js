const cron = require("node-cron");

const { ReminderMailTemplate } = require("./email-template");

function scheduleCrons(EmailService) {
  cron.schedule("*/30 * * * *", async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    try {
      const tickets = await EmailService.getTodaysTickets(today);
      const sub = "Reminder! You have a flight today with FlyRight Airlines";
      const text =
        "Flight Reminder! This is a plain text since html is not working";
      for (const ticket of tickets) {
        await EmailService.sendEmail(
          process.env.GMAIL_ID,
          ticket.recipientEmail,
          sub,
          text,
          ReminderMailTemplate(ticket)
        );
      }
    } catch (error) {
      throw error;
    }
  });
}

module.exports = scheduleCrons;
