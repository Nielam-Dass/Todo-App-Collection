const Task = require("../models/Task");
const express = require("express");

/**
 * Gets all task documents from database
 * @param {express.Request} req Request object
 * @param {express.Response} res Response object
 */
async function getAllTasks(req, res) {
    const tasks = await Task.find().lean();
    res.json(tasks);
}

module.exports = {
    getAllTasks,
}
