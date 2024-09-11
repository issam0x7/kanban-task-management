import Task from "../models/taskModel";

/**
 * @desc create Task
 * @param {object} taskBody
 */

export const createTask = async (taskBody) => {
  const task = new Task(taskBody);
  await task.save();

  return task;
};
