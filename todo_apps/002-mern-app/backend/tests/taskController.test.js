const taskController = require("../src/controllers/taskController");
const mockingoose = require("mockingoose");
const Task = require("../src/models/Task");
const mongoose = require("mongoose");


test("Get individual task by id",  async () => {
    taskDoc = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false
    };
    mockingoose(Task).toReturn(taskDoc, "findOne");

    const requestObj = {
        params: {
            taskId: taskDoc._id
        }
    };
    const mockResponse = { 
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);

    await taskController.getTaskInfo(requestObj, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith(taskDoc);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(200);
});

test("Get 404 error for nonexistent task", () => {
    taskDoc = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false
    };
    mockingoose(Task).toReturn(taskDoc, "findOne");

    const requestObj = {
        params: {
            taskId: "1234"
        }
    };
    const mockResponse = { 
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);

    taskController.getTaskInfo(requestObj, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "Task not found"});
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(404);
});
