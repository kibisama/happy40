const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    id: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    hierachy: { type: Number, required: true, default: 4 },
  },
  { timestamps: true }
);
const model = mongoose.model("Admin", adminSchema);
/**
 * @typedef {model} Admin
 */

module.exports = model;
