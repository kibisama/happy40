const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const roomSchema = new mongoose.Schema(
  {
    branch: { type: ObjectId, ref: "Branch", required: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["OPEN", "OCCUPIED", "RESERVED", "CLOSED"],
      required: true,
      default: "OPEN",
      index: true,
    },
    rent: String,
    deposit: String,
    size: String,
    gender: {
      type: String,
      enum: ["F", "M", "U"],
      required: true,
      default: "F",
    },
    description: String,
    memo: String,
    max_occupants: { type: Number, required: true, default: 1 },
    prime_occupant: { type: ObjectId, ref: "Client" },
    occupants: [{ type: ObjectId, ref: "Client" }],
    waitings: [{ type: ObjectId, ref: "Client" }],
  },
  { timestamps: true, optimisticConcurrency: true }
);
const model = mongoose.model(
  "Room",
  roomSchema.index({ branch: 1, name: 1 }, { unique: true })
);
/**
 * @typedef {"OPEN"|"OCCUPIED"|"RESERVED"|"CLOSED"} Status
 * @typedef {"F"|"M"|"U"} Gender
 * @typedef {object} Room
 * @property {import("mongoose").ObjectId|string} branch
 * @property {string} name
 * @property {Status} [status]
 * @property {string} [rent]
 * @property {string} [deposit]
 * @property {string} [size]
 * @property {Gender} [gender]
 * @property {string} [description]
 * @property {string} [memo]
 * @property {number} [max_occupants]
 * @property {import("mongoose").ObjectId|string} [prime_occupant]
 * @property {[import("mongoose").ObjectId|string]} [occupants]
 * @property {[import("mongoose").ObjectId|string]} [waitings]
 * @typedef {ReturnType<model["hydrate"]>} RoomDocument
 */

module.exports = model;
