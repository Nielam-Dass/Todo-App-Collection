const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Task", taskSchema);
