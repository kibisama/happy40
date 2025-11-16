const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "error",
  format: format.printf(
    ({ timestamp, ref, message, stack }) =>
      `{
  timestamp: ${timestamp},
  reference: ${ref || "system"},
  message: ${stack || message}
}`
  ),
  transports: [new transports.File({ filename: "error.log", level: "error" })],
});

/**
 * @param {Error} error
 * @param {*} [ref]
 * @returns
 */
module.exports = (error, ref) => {
  console.error(error);
  logger.log({
    level: "error",
    timestamp: new Date().toString(),
    ref,
    message: error.message,
    stack: error.stack,
  });
};
