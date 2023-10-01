const express = require("express");
const app = express();

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const amqplib = require("amqplib");

const { emailService } = require("./services");

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://127.0.0.1");
    console.log("connected to queue");
    const channel = await connection.createChannel();
    channel.consume("NOTIFICATION_QUEUE", async (data) => {
      const { recipientEmail, subject, text, html, status } = JSON.parse(
        Buffer.from(data.content)
      );
      await emailService.sendEmail(
        process.env.GMAIL_ID,
        recipientEmail,
        subject,
        text,
        html
      );
      console.log("Email sent");
      await emailService.createTicket({
        recipientEmail,
        subject,
        content: html,
        status,
      });
      console.log("Ticket updated");
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  await connectQueue();
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
