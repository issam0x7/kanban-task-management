const mongoose = require("mongoose");
const Board = require("../models/boardModel");

async function updateTask(req, res) {

   try {
      const { id } = req.params;

      const {boardId, columnId} = req.body;

      if(!boardId || !columnId) {
         return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
      }
   
      const result = await Board.updateOne(
         {
            _id: boardId ,
            "columns.tasks._id": id,
         },
         { $set: { "columns.$[i].tasks.$[j].status": "done" } },
         {
            arrayFilters: [
               { "i._id": columnId },
               { "j._id": id},
            ],
         }
      );
      console.log(result)
   } catch(err) {
      console.log(err)
   }
  
   
   // console.log(result);
}

module.exports = {
   updateTask,
};
