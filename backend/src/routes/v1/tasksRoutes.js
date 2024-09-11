const router = require("express").Router();
const {
  updateTask,
  createTask,
  removeTask,
  addSubtask,
  updateSubtask,
} = require("../../controllers/taskController");
const validate = require("../../middleware/validate");
const { taskValidation } = require("../../validation");

router
  .post("/", validate(taskValidation.createTaskValidation),createTask)
  .put("/:id", validate(taskValidation.updateTaskValidation), updateTask)
  .put("/:id/subtasks", updateSubtask)
  .post("/create/subTask/:id", addSubtask)
  .delete("/:id", removeTask);

module.exports = router;
