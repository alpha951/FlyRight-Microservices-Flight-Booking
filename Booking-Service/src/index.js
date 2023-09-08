const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();
const CRONS = require("./utils/common/cron-jobs");

app.use(express.json()); // for parsing application/json from request body

// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  CRONS();
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
