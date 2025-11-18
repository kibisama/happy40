const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const contractSchema = new mongoose.Schema(
  {
    room: { type: ObjectId, ref: "Room", required: true },
    client: { type: ObjectId, ref: "Room", required: true },
    date_start: { type: Date, required: true },
    date_end: { type: Date, reqruied: true },
  },
  { timestamps: true }
);
const model = mongoose.model("Contract", contractSchema);

/**
 * @typedef {Awaited<ReturnType<model["create"]>>[0]} Contract
 * @typedef {typeof model.schema.obj} ContractSchema
 */

module.exports = model;
