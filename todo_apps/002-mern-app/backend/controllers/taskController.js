const Task = require("../models/Task");


function getTaskInfo(req, res) {
    res.send(`Task info for id=${req.params.taskId}`);
}

async function addTask(req, res) {
    const taskObject = req.body;
    const task = await Task.create(taskObject);
    if(task) {
        res.status(201).json({message: "New task created"});
    }
    else {
        res.status(400).json({message: "Failed to create task"});
    }
}

function updateTask(req, res) {
    res.send(`Task id=${req.params.taskId} updated`);
}

function deleteTask(req, res) {
    res.send(`Task id=${req.params.taskId} deleted`);
}

module.exports = { getTaskInfo, addTask, updateTask, deleteTask };
