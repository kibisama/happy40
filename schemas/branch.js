const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);
const model = mongoose.model("Branch", branchSchema);

/**
 * @typedef {Awaited<ReturnType<model["create"]>>[0]} Branch
 * @typedef {typeof model.schema.obj} BranchSchema
 */

module.exports = model;
