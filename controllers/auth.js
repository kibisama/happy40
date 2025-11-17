const { audit_logger } = require("../logger");
const auth = require("../services/auth");

exports.email_validity_checks = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (await auth.is_email_valid(email)) {
      return res.sendStatus(200);
    }
    return res.sendStatus(422);
  } catch (e) {
    next(e);
  }
};

// exports.join = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const status = await auth.join(email, password);
//     res.sendStatus(status);
//   } catch (e) {
//     next(e);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const result = await auth.login(email, password);
//     if (typeof result === "number") {
//       return res.sendStatus(result);
//     } else {
//       return res.send(result);
//     }
//   } catch (e) {
//     next(e);
//   }
// };

exports.admin_login = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const result = await auth.admin_login(id, password);
    if (typeof result === "number") {
      return res.sendStatus(result);
    }
    audit_logger("admin_login", id, req);
    return res.send(result);
  } catch (e) {
    next(e);
  }
};

exports.refresh_token = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    const result = await auth.refresh_token(refresh_token);
    if (typeof result === "number") {
      result === 401 && audit_logger("refresh_token", refresh_token, req);
      return res.status(result).sendStatus(result);
    }
    return res.send(result);
  } catch (e) {
    next(e);
  }
};
