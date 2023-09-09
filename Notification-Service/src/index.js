const express = require("express");

const { ServerConfig, mailsender } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  try {
    const response = await mailsender.sendMail({
      from: ServerConfig.GMAIL_ID,
      to: "20uec091@lnmiit.ac.in",
      subject: "Attacking ... ",
      text: "Your account is hacked!",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});
