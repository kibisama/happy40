const { error_logger, audit_logger } = require("../logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../schemas/admin");
const User = require("../schemas/user");
const NodeCache = require("node-cache");
const nodeCache_admins = new NodeCache();

(async function () {
  try {
    if (!(await Admin.findOne())) {
      await Admin.create({
        id: process.env.INIT_ADMIN_NAME,
        password: await bcrypt.hash(process.env.INIT_ADMIN_PASSWORD, 10),
        hierachy: 0,
      });
    }
  } catch (e) {
    error_logger(e);
  }
})();

/**
 * @param {string} email
 * @returns {Proimse<boolean>}
 */
exports.is_email_valid = async (email) => {
  var email = email.toLowerCase();
  try {
    if (await User.findOne({ email })) {
      return false;
    }
    return true;
  } catch (e) {
    throw e;
  }
};

// /**
//  * @param {string} email
//  * @param {string} password
//  * @returns {Proimse<string>} jwt
//  */
// exports.join = async (email, password) => {
//   try {
//     if (!(await exports.is_email_valid(email))) {
//       return 422;
//     }
//     const hash = await bcrypt.hash(password, 12);
//     const user = await User.create({
//       email,
//       password: hash,
//     });
//     return jwt.sign({ sub: user.email }, process.env.JWT_SECRET);
//     return 200;
//   } catch (e) {
//     throw e;
//   }
// };

// /**
//  * @param {string} email
//  * @param {string} password
//  * @returns {Proimse<>}
//  */
// exports.login = async (email, password) => {
//   try {
//     const user = await User.findOne({
//       email,
//     });
//     if (user) {
//       const result = await bcrypt.compare(password, user.password);
//       if (result) {
//         return jwt.sign(
//           {
//             sub: user.email,
//           },
//           process.env.JWT_SECRET
//         );
//       } else {
//         return 401;
//       }
//     } else {
//       return 404;
//     }
//   } catch (e) {
//     throw e;
//   }
// };

/**
 * @typedef {object} Token
 * @property {string} access_token
 * @property {string} refresh_token
 */

/**
 * @param {*} _id
 * @param {number} h
 * @returns {string}
 */
const create_admin_tokens = (_id, h) => {
  const refresh_token = jwt.sign(
    { sub: _id, h },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  // local cache
  nodeCache_admins.set(_id, refresh_token);
  return {
    access_token: jwt.sign(
      { sub: _id, h },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    ),
    refresh_token,
  };
};

/**
 * @param {string} id
 * @param {string} password
 * @returns {Proimse<Token|number>}
 */
exports.admin_login = async (id, password) => {
  try {
    const admin = await Admin.findOne({ id });
    if (admin) {
      const result = await bcrypt.compare(password, admin.password);
      if (result) {
        return create_admin_tokens(admin._id.toString(), admin.hierachy);
      } else {
        return 401;
      }
    } else {
      return 404;
    }
  } catch (e) {
    throw e;
  }
};

/**
 * @param {string} refresh_token
 * @returns {Proimse<Token|number>}
 */
exports.refresh_token = async (refresh_token) => {
  try {
    const payload = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    const { sub, h } = payload;
    if (h < 5) {
      // local cache
      const cache_refresh_token = nodeCache_admins.get(sub);
      if (cache_refresh_token && cache_refresh_token === refresh_token) {
        return create_admin_tokens(sub, h);
      } else {
        return 401;
      }
    } else {
      // for guests
      //
      //
    }
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return 419;
    } else if (e.name === "JsonWebTokenError") {
      return 401;
    }
    throw e;
  }
};
