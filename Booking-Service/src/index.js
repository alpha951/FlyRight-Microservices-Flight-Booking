const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();
const { BookingService } = require("./services");
const CRONS = require("./utils/common/cron-jobs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  CRONS(BookingService);
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
