const mongoose = require('mongoose');

export const taskSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Task', taskSchema);