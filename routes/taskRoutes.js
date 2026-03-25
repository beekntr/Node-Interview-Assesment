const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const validate = require("../middleware/validate");

router.post("/", validate.validateTaskCreate, taskController.createTask);

router.get("/", taskController.getAllTasks);

router.get("/:id", validate.validateObjectId, taskController.getTaskById);

router.put("/:id", validate.validateObjectId, validate.validateTaskUpdate, taskController.updateTask);

router.patch("/:id/complete", validate.validateObjectId, taskController.completeTask);

router.delete("/:id", validate.validateObjectId, taskController.deleteTask);

module.exports = router;