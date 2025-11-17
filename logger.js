const { createLogger, format, transports } = require("winston");

const _error_logger = createLogger({
  level: "error",
  format: format.printf(
    ({ timestamp, req, message, stack }) =>
      `{
  timestamp: ${timestamp},${
        req
          ? `\n  ip: ${req.ips.length > 0 ? JSON.stringify(req.ips) : req.ip},`
          : ""
      }
  message: ${stack || message}
}`
  ),
  transports: [new transports.File({ filename: "error.log", level: "error" })],
});
const _audit_logger = createLogger({
  level: "info",
  format: format.printf(
    ({ timestamp, ref, req, message }) =>
      `{
  timestamp: ${timestamp},${ref ? `\n  reference: ${ref},` : ""}${
        !req
          ? ""
          : req.ips.length > 0
          ? `\n  ip: ${JSON.stringify(req.ips)},${
              req.ua ? `\n  ua: ${JSON.stringify(req.ua)},` : ""
            }`
          : `\n  ip: ${req.ip},${
              req.ua ? `\n  ua: ${JSON.stringify(req.ua)},` : ""
            }`
      }
  message: ${message}
}`
  ),
  transports: [new transports.File({ filename: "audit.log", level: "info" })],
});

/**
 * @param {Error} error
 * @param {import('express').Request} [req]
 * @returns
 */
const error_logger = (error, req) => {
  console.error(error);
  _error_logger.log({
    level: "error",
    timestamp: new Date().toString(),
    req,
    message: error.message,
    stack: error.stack,
  });
};
/**
 * @param {*} message
 * @param {*} [ref]
 * @param {import('express').Request} [req]
 * @returns
 */
const audit_logger = (message, ref, req) => {
  _audit_logger.log({
    level: "info",
    timestamp: new Date().toString(),
    ref,
    req,
    message,
  });
};

module.exports = { error_logger, audit_logger };
