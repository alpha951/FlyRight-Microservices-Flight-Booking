const express = require("express");
const amqplib = require("amqplib");

const { ServerConfig } = require("./config");
const { Queue } = require("./config/");
const apiRoutes = require("./routes");

const app = express();
const { BookingService } = require("./services");
const CRONS = require("./utils/common/cron-jobs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  CRONS(BookingService);
  await Queue.connectQueue();
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
