const router = require("express").Router();
const {
   updateTask,
   addTask,
   removeTask,
   addSubtask,
   updateSubtask,
} = require("../../controllers/taskController");

router
   .put("/:id", updateTask)
   .put("/:id/subtasks", updateSubtask)
   .post("/", addTask)
   .post("/create/subTask/:id", addSubtask)
   .delete("/:id", removeTask);

module.exports = router;
