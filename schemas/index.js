const mongoose = require("mongoose");
const { error_logger } = require("../loggers");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect(process.env.MONGODB_ADDRESS, {
      dbName: "happy40",
    })
    .catch((e) => error_logger(e));
};

mongoose.connection.on("error", (e) => error_logger(e));
mongoose.connection.on("disconnected", () => {
  error_logger(e);
  connect();
});

module.exports = connect;
