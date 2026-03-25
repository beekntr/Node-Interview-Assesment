const Task = require("../models/Task");
const createTask = async (req, res, next) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description || "",
      dueDate: req.body.dueDate || null,
      category: req.body.category || "general",
    });

    const savedTask = await task.save();

    res.status(201).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status === "completed") {
      filter.completed = true;
    } else if (req.query.status === "pending") {
      filter.completed = false;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }
    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }
    if (req.body.dueDate !== undefined) {
      task.dueDate = req.body.dueDate;
    }
    if (req.body.category !== undefined) {
      task.category = req.body.category;
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }
    if (task.completed === true) {
      return res.status(400).json({
        success: false,
        error: "Task is already marked as completed",
      });
    }

    task.completed = true;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  completeTask,
  deleteTask,
};
