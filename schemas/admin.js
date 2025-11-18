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
 * @typedef {object} Admin
 * @property {string} id
 * @property {string} password
 * @property {0|1|2|3} [hierachy]
 * @property {string} name
 * @typedef {ReturnType<model["hydrate"]>} AdminDocument
 */
module.exports = model;
