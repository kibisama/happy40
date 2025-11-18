const mongoose = require("mongoose");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    description: String,
    rooms: [{ type: ObjectId, ref: "Room" }],
  },
  { timestamps: true }
);
const model = mongoose.model("Branch", branchSchema);

/**
 * @typedef {object} Branch
 * @property {string} name
 * @property {string} address
 * @property {string} contact
 * @property {string} [description]
 * @property {[import("mongoose").ObjectId|string]} [rooms]
 * @typedef {ReturnType<model["hydrate"]>} BranchDocument
 */

module.exports = model;
