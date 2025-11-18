const mongoose = require("mongoose");
const Room = require("../schemas/room");
const Branch = require("../schemas/branch");

/**
 * @param {Room.Room} room
 * @returns {Promise<Room.RoomDocument>}
 */
exports.createRoom = async (room) => {
  if (!(room.branch && room.name)) {
    throw { status: 400 };
  }
  const tx = await mongoose.startSession();
  const result = await tx.withTransaction(async () => {
    const room_document = await Room.create(room);
    const branch = await Branch.findByIdAndUpdate(room.branch, {
      $addToSet: { rooms: room_document._id },
    });
    if (!branch) {
      throw { status: 404 };
    }
    return room_document;
  });
  return result;
};
