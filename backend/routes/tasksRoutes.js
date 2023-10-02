const router = require("express").Router();
const { updateTask } = require("../controllers/taskController");




router.put("/:id", updateTask);

module.exports = router;