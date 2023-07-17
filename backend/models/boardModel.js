const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  subtasks: [
    {
      title: String,
      isCompleted: Boolean,
    },
  ],
});

const columnSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema],
});

const boardSchema = new mongoose.Schema({
  name: String,
  columns: [columnSchema],
}, { _id: true }); // Include the _id field explicitly

module.exports = mongoose.model('Board', boardSchema);