const router = require("express").Router();
const { updateTask, addTask } = require("../controllers/taskController");

router.put("/:id", updateTask)
      .post("/addTask", addTask);

module.exports = router;
