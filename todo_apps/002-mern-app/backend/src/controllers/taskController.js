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
    
    if(taskName===undefined || taskDescription===undefined || taskCompleted===undefined || req.body._id===undefined) {
        res.status(400).json({ message: "All fields are required to update a task" });
        return;
    }
    if(req.body._id !== taskId) {
        res.status(400).json({ message: "Task id cannot be changed" });
        return;
    }
    const task = await Task.findById(taskId);
    if(!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    task.taskName = taskName;
    task.taskDescription = taskDescription;
    task.taskCompleted = taskCompleted;
    await task.save();
    res.status(200).json({ message: `Task ${taskId} has been updated` });
}

async function deleteTask(req, res) {
    const { id } = req.body;
    if(id===undefined) {
        res.status(400).json({ message: "Id field is required in to delete a task" });
        return;
    }
    if(id!==req.params.taskId) {
        res.status(400).json({ message: `Cannot delete task with id ${id} at current endpoint` });
        return;
    }
    const task = await Task.findById(id);
    await task.deleteOne();
    res.status(200).json({ message: `Task ${id} has been deleted` });
}

module.exports = { getTaskInfo, addTask, updateTask, deleteTask };
