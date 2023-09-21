const mongoose = require('mongoose');




const boardSchema = new mongoose.Schema({
  name: String,
  columns: [{ type : mongoose.Schema.Types.ObjectId, ref : "Column"}],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { _id: true }); // Include the _id field explicitly

module.exports = mongoose.model('Board', boardSchema);