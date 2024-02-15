const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const boardSchema = new mongoose.Schema(
  {
    name: String,
    columns: [columnSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : true,
    },
  },
  { _id: true }
); // Include the _id field explicitly

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;

