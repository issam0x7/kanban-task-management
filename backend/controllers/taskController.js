
const Board = require("../models/boardModel");

async function updateTask(req, res) {
   try {
      const { id } = req.params;

      const { boardId, columnId, task } = req.body;

      if (!boardId || !columnId || !task) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      const updateData = {};

      // Loop through the fields in the 'task' object and add them to 'updateData'
      for (const key in task) {
         if (task.hasOwnProperty(key)) {
            updateData[`columns.$[i].tasks.$[j].${key}`] = task[key];
         }
      }

      const result = await Board.updateOne(
         {
            _id: boardId,
         },
         { $set: updateData },
         {
            arrayFilters: [{ "i._id": columnId }, { "j._id": id }],
         }
      );
      if (result.matchedCount === 1) {
         return res
            .status(200)
            .json({ message: "The task is updated", result });
      } else {
         return res.status(404).json({ message: "Document not found" });
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}

async function addTask(req, res) {
   try {
      const { boardId, columnId, task } = req.body;

      if (!boardId || !columnId || !task) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      console.log(boardId, columnId, task)

      const result = await Board.updateOne(
         {
            _id: boardId,
         },
         { $push: { "columns.$[i].tasks": task } },
         {
            arrayFilters: [{ "i._id": columnId }],
         }
      );
      if (result.matchedCount === 1) {
         return res.status(200).json({ message: "The task added ", result });
      } else {
         return res.status(404).json({ message: "Document not found", result });
      }
   } catch (err) {
      // console.error(err);
      // return res.status(500).json({ message: "Internal server error" });
   }
}

module.exports = {
   updateTask,
   addTask,
};
