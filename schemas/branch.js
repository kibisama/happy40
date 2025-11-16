const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const {
//   Types: { ObjectId },
// } = Schema;

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
const model = mongoose.model("Branch", branchSchema);
/**
 * @typedef {model} Branch
 */

module.exports = model;
