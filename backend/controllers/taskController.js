const Board = require("../models/boardModel");
const Task = require("../models/taskModel");

async function updateTask(req, res) {
   try {
      const { id } = req.params;

      const { task } = req.body;

      if ( !task) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      const updateData = {};

      // Loop through the fields in the 'task' object and add them to 'updateData'
      for (const key in task) {
         if (task.hasOwnProperty(key)) {
            updateData[`${key}`] = task[key];
         }
      }

      const result = await Task.updateOne(
         {
            _id: id,
         },
         { $set: updateData },
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
      const { columnId, title, description, subtasks } = req.body;

      if (!columnId) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      const task = new Task({
         title,
         description,
         isCompleted : false,
         columnId,
         subtasks
      })

      let error =  task.validateSync(); 

      if(error) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }


      task.save();

      return res.status(201).json({ message: "The task added ", task});
      // if (typeof tasks !== "array") {
      //    return res
      //       .status(400)
      //       .json({ success: false, message: "the tasks must be an array" });
      // }

      // console.log(boardId, columnId, tasks);

      // const result = await Board.updateOne(
      //    {
      //       _id: boardId,
      //    },
      //    { $push: { "columns.$[i].tasks": { $each: [...tasks] } } },
      //    {
      //       arrayFilters: [{ "i._id": columnId }],
      //    }
      // );
      // if (result.matchedCount === 1) {
      //    return res.status(200).json({ message: "The task added ", result });
      // } else {
      //    return res.status(404).json({ message: "Document not found", result });
      // }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}


async function addSubtask(req, res) {
   try {

      const { id } = req.params;
     
      const { subtasks } = req.body;

      console.log(subtasks)

      if (!subtasks) {
         return res
            .status(400)
            .json({ success: false, message: "Invalid data provided" });
      }

      // if (typeof subtasks !== "array") {
      //    return res
      //       .status(400)
      //       .json({ success: false, message: "the tasks must be an array" });
      // }

     

      const result = await Task.updateOne(
         {
            _id: id,
         },
         { $push:  {"subtasks" :{ $each: [...subtasks] } } },
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
      const result = await Task.deleteOne(
         {
            _id: id,
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
