const logger = require("../logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../schemas/admin");
const User = require("../schemas/user");
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
    logger(e);
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
 * @param {string} id
 * @param {string} password
 * @returns {Proimse<string|number>}
 */
exports.admin_login = async (id, password) => {
  try {
    const admin = await Admin.findOne({ id });
    if (admin) {
      const result = await bcrypt.compare(password, admin.password);
      if (result) {
        return jwt.sign(
          {
            sub: admin._id,
            h: admin.hierachy,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
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
