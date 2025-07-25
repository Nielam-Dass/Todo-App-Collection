const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");


router.get("/:taskId", taskController.getTaskInfo);

module.exports = router;
