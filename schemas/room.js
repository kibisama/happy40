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
      // index: true,
    },
    description: String,
    memo: String,
    max_occupants: { type: Number, required: true, default: 1 },
    prime_occupant: { type: ObjectId, ref: "Client" },
    occupants: [{ type: ObjectId, ref: "Client" }],
    waitings: [{ type: ObjectId, ref: "Client" }],
  },
  { timestamps: true }
);
const model = mongoose.model(
  "Room",
  roomSchema.index({ branch: 1, name: 1 }, { unique: true })
);
/**
 * @typedef {Awaited<ReturnType<model["create"]>>[0]} Room
 * @typedef {typeof model.schema.obj} RoomSchema
 * @typedef {"OPEN"|"OCCUPIED"|"RESERVED"|"CLOSED"} Status
 * @typedef {"F"|"M"|"U"} Gender
 */

module.exports = model;
