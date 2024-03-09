const httpStatus = require("http-status");
const Task = require("../models/taskModel");
const { taskService } = require("../services");

async function updateTask(req, res) {
  try {
    const { id } = req.params;

    const { task } = req.body;

    if (!task) {
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
      { $set: updateData }
    );
    if (result.matchedCount === 1) {
      return res.status(200).json({ message: "The task is updated", result });
    } else {
      return res.status(404).json({ message: "Document not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    return res.status(httpStatus.CREATED).json(task);
  } catch (error) {
    next(error);
  }
}

async function removeTask(req, res) {
  try {
    const { id } = req.params;
    const result = await Task.deleteOne({
      _id: id,
    });
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

    const { subtasks } = req.body;

    console.log(subtasks);

    if (!subtasks) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const result = await Task.updateOne(
      {
        _id: id,
      },
      { $push: { subtasks: { $each: [...subtasks] } } }
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

async function updateSubtask(req, res) {
  try {
    const { id } = req.params;

    const { subtasks } = req.body;

    console.log(subtasks);

    if (!subtasks && !subtasks?._id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const update = Object.fromEntries(
      Object.entries(subtasks).map(([key, value]) => [
        `subtasks.$[i].${key}`,
        value,
      ])
    );

    const result = await Task.updateOne(
      {
        _id: id,
      },
      { $set: update },
      {
        arrayFilters: [{ "i._id": subtasks._id }],
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

module.exports = {
  updateTask,
  createTask,
  removeTask,
  addSubtask,
  updateSubtask,
};
