const mongoose = require("mongoose");
const logger = require("../logger");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect(process.env.MONGODB_ADDRESS, {
      dbName: "happy40",
    })
    .catch((e) => logger(e));
};

mongoose.connection.on("error", (e) => logger(e));
mongoose.connection.on("disconnected", () => {
  logger(e);
  connect();
});

module.exports = connect;
