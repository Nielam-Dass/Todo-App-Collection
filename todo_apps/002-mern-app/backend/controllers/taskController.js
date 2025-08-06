function getTaskInfo(req, res) {
    res.send(`Task info for id=${req.params.taskId}`);
}

function addTask(req, res) {
    res.send("Task added");
}

function updateTask(req, res) {
    res.send(`Task id=${req.params.taskId} updated`);
}

function deleteTask(req, res) {
    res.send(`Task id=${req.params.taskId} deleted`);
}

module.exports = { getTaskInfo, addTask, updateTask, deleteTask };
