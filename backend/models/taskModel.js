const mongoose = require('mongoose');

export const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  subtasks: [{"type" : mongoose.Schema.Types.ObjectId , "ref" : "Task"}],
});

module.exports = mongoose.model('Task', taskSchema);