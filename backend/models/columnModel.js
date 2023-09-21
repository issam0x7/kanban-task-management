const mongoose = require('mongoose');
const { taskSchema } = require('./taskModel');

export const columnSchema = new mongoose.Schema({
  name: String,
  color : String,
  tasks: [{
    type : mongoose.Schema.ObjectId,
    ref : "Task"
  }],
});



module.exports = mongoose.model('Column', columnSchema);