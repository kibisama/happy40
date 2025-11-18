const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    id: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    hierachy: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3],
      default: 3,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);
const model = mongoose.model("Admin", adminSchema);
/**
 * @typedef {Awaited<ReturnType<model["create"]>>[0]} Admin
 * @typedef {typeof model.schema.obj} AdminSchema
 */

module.exports = model;
