const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");


router.get("/:taskId", taskController.getTaskInfo);

router.post("/", taskController.addTask);

router.put("/:taskId", taskController.updateTask);

router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
