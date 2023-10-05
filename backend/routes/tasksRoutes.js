const router = require("express").Router();
const { updateTask, addTask, removeTask } = require("../controllers/taskController");

router.put("/:id", updateTask)
      .post("/addTask", addTask)
      .delete("/:id", removeTask);

module.exports = router;
