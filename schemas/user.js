const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const {
//   Types: { ObjectId },
// } = Schema;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const model = mongoose.model("User", userSchema);
/**
 * @typedef {model} User
 */

module.exports = model;
