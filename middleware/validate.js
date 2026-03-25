const mongoose = require("mongoose");
const validateTaskCreate = (req, res, next) => {
  const title = req.body.title;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Title is required and cannot be empty",
    });
  }

  next();
};

const validateTaskUpdate = (req, res, next) => {
  const title = req.body.title;

  if (title !== undefined && title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: "Title cannot be empty",
    });
  }

  next();
};

const validateObjectId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid task ID: " + id,
    });
  }

  next();
};

module.exports = {
  validateTaskCreate,
  validateTaskUpdate,
  validateObjectId,
};
