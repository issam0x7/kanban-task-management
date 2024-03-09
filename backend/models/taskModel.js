const mongoose = require("mongoose");
const MongoSchema = require("../config/mongoSchema");

const taskSchema = new MongoSchema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type : Boolean, required: true },
  subtasks: [
    {
      title: String,
      isCompleted: Boolean,
    },
  ],
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },

  //  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
