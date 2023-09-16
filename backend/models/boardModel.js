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
  color : String,
  tasks: [taskSchema],
});

const boardSchema = new mongoose.Schema({
  name: String,
  columns: [columnSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { _id: true }); // Include the _id field explicitly

module.exports = mongoose.model('Board', boardSchema);