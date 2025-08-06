const Task = require("../models/Task");


async function getAllTasks(req, res) {
    const tasks = await Task.find().lean();
    res.json(tasks);
}

module.exports = {
    getAllTasks,
}
