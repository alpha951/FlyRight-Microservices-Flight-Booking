const amqplib = require("amqplib");

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://127.0.0.1");
    console.log("connected to queue");
    channel = await connection.createChannel();
    await channel.assertQueue("NOTIFICATION_QUEUE");
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  try {
    await channel.sendToQueue(
      "NOTIFICATION_QUEUE",
      Buffer.from(JSON.stringify(data))
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectQueue, sendData };
