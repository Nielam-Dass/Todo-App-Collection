const mongoose = require("mongoose");
const Task = require("../models/Task");


async function getTaskInfo(req, res) {
    if(!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
        return res.status(404).json({message: "Task not found"});
    }
    const task = await Task.findById(req.params.taskId).lean();
    if(!task) {
        return res.status(404).json({message: "Task not found"});
    }
    res.status(200).json(task);
}

async function addTask(req, res) {
    const taskObject = req.body;
    if(!taskObject.taskName || !taskObject.taskDescription) {
        return res.status(400).json({message: "Must provide task name and description"})
    }
    const task = await Task.create(taskObject);
    if(task) {
        res.status(201).json({message: "New task created"});
    }
    else {
        res.status(400).json({message: "Failed to create task"});
    }
}

async function updateTask(req, res) {
    const taskId = req.params.taskId;
    const { taskName, taskDescription, taskCompleted } = req.body;
    const task = await Task.findById(taskId);
    task.taskName = taskName;
    task.taskDescription = taskDescription;
    task.taskCompleted = taskCompleted;
    await task.save();
    res.status(200).json({ message: `Task ${taskId} has been updated` })
}

function deleteTask(req, res) {
    res.send(`Task id=${req.params.taskId} deleted`);
}

module.exports = { getTaskInfo, addTask, updateTask, deleteTask };
