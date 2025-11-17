const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const roomSchema = new mongoose.Schema(
  {
    branch: { type: ObjectId, ref: "Branch", required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);
const model = mongoose.model(
  "Room",
  roomSchema.index({ branch: 1, name: 1 }, { unique: true })
);
/**
 * @typedef {model} Branch
 */

module.exports = model;
