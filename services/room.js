const Room = require("../schemas/room");

/**
 * @typedef {import("mongoose").ObjectId} ObjectId
 */

/**
 * @param {string} name
 * @param {ObjectId|string} branch
 * @returns {}
 */
exports.createRoom = async (name, branch) => {
  try {
    return await Room.create({ name, branch });
  } catch (e) {
    throw e;
  }
};
