const { error_logger } = require("../loggers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../schemas/admin");
const NodeCache = require("node-cache");
const nodeCache_admins = new NodeCache();

(async function () {
  try {
    if (!(await Admin.findOne())) {
      await Admin.create({
        id: process.env.INIT_ADMIN_NAME,
        password: await bcrypt.hash(process.env.INIT_ADMIN_PASSWORD, 10),
        hierachy: 0,
        name: "admin",
      });
    }
  } catch (e) {
    error_logger(e);
  }
})();

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
  // set local cache
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
 * @returns {Proimse<Token>}
 */
exports.admin_login = async (id, password) => {
  if (!(id && password)) {
    throw { status: 400 };
  }
  const admin = await Admin.findOne({ id });
  if (admin) {
    const result = await bcrypt.compare(password, admin.password);
    if (result) {
      return create_admin_tokens(admin._id.toString(), admin.hierachy);
    } else {
      throw { status: 401 };
    }
  } else {
    throw { status: 404 };
  }
};

/**
 * @param {string} refresh_token
 * @returns {Proimse<Token>}
 */
exports.refresh_token = async (refresh_token) => {
  if (!refresh_token) {
    throw { status: 400 };
  }
  const payload = jwt.verify(
    refresh_token,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const { sub, h } = payload;
  if (h < 4) {
    // get local cache
    const cache_refresh_token = nodeCache_admins.get(sub);
    if (!cache_refresh_token) {
      throw { status: 419 };
    } else if (cache_refresh_token === refresh_token) {
      return create_admin_tokens(sub, h);
    } else {
      throw new jwt.JsonWebTokenError();
    }
  } else {
    // for clients
  }
};
