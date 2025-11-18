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
const _auth_admin_logger = createLogger({
  level: "info",
  format: format.printf(
    ({ timestamp, caller, ref, req }) =>
      `{
  timestamp: ${timestamp},
  caller: ${caller},
  reference: ${ref},
  ip: ${req.ips.length > 0 ? JSON.stringify(req.ips) : req.ip},
  ua: ${JSON.stringify(req.ua)},
}`
  ),
  transports: [
    new transports.File({ filename: "auth_admin_audit.log", level: "info" }),
  ],
});
// const _audit_logger = createLogger({
//   level: "info",
//   format: format.printf(
//     ({ timestamp, ref, req, message }) =>
//       `{
//   timestamp: ${timestamp},${ref ? `\n  reference: ${ref},` : ""}${
//         !req
//           ? ""
//           : req.ips.length > 0
//           ? `\n  ip: ${JSON.stringify(req.ips)},${
//               req.ua ? `\n  ua: ${JSON.stringify(req.ua)},` : ""
//             }`
//           : `\n  ip: ${req.ip},${
//               req.ua ? `\n  ua: ${JSON.stringify(req.ua)},` : ""
//             }`
//       }
//   message: ${message}
// }`
//   ),
//   transports: [new transports.File({ filename: "audit.log", level: "info" })],
// });

/**
 * @param {Error} error
 * @param {import('express').Request} [req]
 * @returns {void}
 */
exports.error_logger = (error, req) => {
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
 * @param {string} caller
 * @param {string} ref
 * @param {import('express').Request} req
 * @returns {void}
 */
exports.auth_admin_logger = (caller, ref, req) => {
  _auth_admin_logger.log({
    level: "info",
    timestamp: new Date().toString(),
    caller,
    ref,
    req,
  });
};
