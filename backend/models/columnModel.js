const mongoose = require('mongoose');


const columnSchema = new mongoose.Schema({
  name: String,
  color : String,
  tasks: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Task"
  }],
});



module.exports = mongoose.model('Column', columnSchema);