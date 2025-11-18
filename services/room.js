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
  if (!(name && branch)) {
    throw { status: 400 };
  }
  return await Room.create({ name, branch });
};
