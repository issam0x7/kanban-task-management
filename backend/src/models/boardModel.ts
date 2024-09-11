import mongoose from "mongoose";
import MongoSchema from "../config/mongoSchema";
import Task from "./taskModel";

const columnSchema = new MongoSchema({
  name: String,
  color: String,
});

const boardSchema = new MongoSchema(
  {
    name: String,
    columns: [columnSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { _id: true }
); // Include the _id field explicitly

boardSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Task.deleteMany({
        columnId: { $in: this.columns.map((column) => column._id) },
      });
      next();
    } catch (error) {
      next(error)
    }
  }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
