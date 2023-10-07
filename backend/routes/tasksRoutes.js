const router = require("express").Router();
const { updateTask, addTask, removeTask, addSubtask } = require("../controllers/taskController");

router.put("/:id", updateTask)
      .post("/create", addTask)
      .post("/create/subTask/:id", addSubtask)
      .delete("/:id", removeTask);

module.exports = router;
