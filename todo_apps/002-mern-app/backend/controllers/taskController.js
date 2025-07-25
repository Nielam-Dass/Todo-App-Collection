function getTaskInfo(req, res) {
    res.send(`Task info for id=${req.params.taskId}`);
}

module.exports = { getTaskInfo };
