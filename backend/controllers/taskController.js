const mongoose = require("mongoose");
const Board = require("../models/boardModel");

async function updateTask(req, res) {
   const { id } = req.params;

   const result = await Board.findOneAndUpdate({
      "columns._id" : id
   }, {
      $set : [{"tasks.[outer].name" : "test"}]
   }, 
   { "arrayFilters" : [ {"outer._id" : "6514579ae6cbfdcf5aeb37c3"}]}
   );
   console.log(result);
}

module.exports = {
   updateTask,
};
