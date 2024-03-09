const Task = require("../models/taskModel");

/**
 * @desc create Task
 * @param {object} taskBody
 */

const createTask = async (taskBody) => {
  const task = new Task(taskBody);
  await task.save();

  return task;
};


module.exports = {
    createTask
}