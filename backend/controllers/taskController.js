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
      const { boardId, columnId, tasks } = req.body;

      if (!boardId || !columnId || !tasks) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      if (typeof tasks !== "array") {
         return res
            .status(400)
            .json({ success: false, message: "the tasks must be an array" });
      }

      console.log(boardId, columnId, tasks);

      const result = await Board.updateOne(
         {
            _id: boardId,
         },
         { $push: { "columns.$[i].tasks": { $each: [...tasks] } } },
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
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}


async function addSubtask(req, res) {
   try {

      const { id } = req.params;
      const { boardId, columnId, tasks } = req.body;

      if (!boardId || !columnId || !subtasks) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      if (typeof subtasks !== "array") {
         return res
            .status(400)
            .json({ success: false, message: "the tasks must be an array" });
      }

      console.log(boardId, columnId, tasks);

      const result = await Board.updateOne(
         {
            _id: boardId,
         },
         { $push: { "columns.$[i].tasks.$[j]": { $each: [...subtasks] } } },
         {
            arrayFilters: [{ "i._id": columnId }, { "j._id": id }],
         }
      );
      if (result.matchedCount === 1) {
         return res.status(200).json({ message: "The subtask added ", result });
      } else {
         return res.status(404).json({ message: "Document not found", result });
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}

async function removeTask(req, res) {
   try {
      const { id } = req.params;
      const { boardId, columnId} = req.body;

      if (!boardId || !columnId) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      const result = await Board.updateOne(
         {
            _id: boardId,
         },
         { $pull: { "columns.$[column].tasks": { _id: id } } },
         {
            arrayFilters: [{ "column._id": columnId }],
         }
      );
      if (result.matchedCount === 1) {
         return res.status(200).json({ message: "The task added ", result });
      } else {
         return res.status(404).json({ message: "Document not found", result });
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}

module.exports = {
   updateTask,
   addTask,
   removeTask,
   addSubtask,
};
