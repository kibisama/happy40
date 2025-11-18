// const mongoose = require("mongoose");
// // const { Schema } = mongoose;
// // const {
// //   Types: { ObjectId },
// // } = Schema;

// const clientSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     contact: { type: String, required: true },
//     gender: {
//       type: String,
//       enum: ["F", "M", "U"],
//       required: true,
//       default: "F",
//     },
//     id_number: {
//       type: String,
//     },
//     id_type: {
//       type: String,
//       enum: ["R", "P"],
//       required: function () {
//         return !!this.id_number;
//       },
//     },
//   },
//   { timestamps: true }
// );
// const model = mongoose.model("Client", clientSchema);
// /**
//  * @typedef {model} Client
//  */

// module.exports = model;
