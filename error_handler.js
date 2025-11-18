// const map = {
//   MongoServerError: {
//     11000: { status: 409 },
//   },
// };

const { error_logger } = require("./loggers");
module.exports = (e, req, res, next) => {
  const { name, code } = e;
  let status = e.status;
  if (!status) {
    switch (name) {
      case "MongoServerError":
        switch (code) {
          case 11000:
            status = 409;
            break;
          default:
        }
        break;
      case "JsonWebTokenError":
        status = 401;
        // auditlog
        break;
      default:
    }
  }
  console.log("e.code", e.code, "e.name", e.name);
  console.error(e);
  // e.logger ? error_logger(e, req) : console.error(e);
  return res.sendStatus(status || 500);
};
