const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   isCompleted: { type: Boolean, required: true },
   subtasks: [
      {
         title: String,
         isCompleted: Boolean,
      },
   ],
   columnId: { type: mongoose.Schema.Types.ObjectId, ref: "Column", required : true },

   //  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Task", taskSchema);
