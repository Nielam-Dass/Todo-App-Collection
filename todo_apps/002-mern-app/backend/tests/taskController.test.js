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

test("Get 404 error for invalid task id", async () => {
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

    await taskController.getTaskInfo(requestObj, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "Task not found"});
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(404);
});

test("Get 404 error for nonexistent task", async () => {
    taskDoc = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false
    };
    mockingoose(Task).toReturn((query) => {
        queryFilter = query.getQuery();
        return (queryFilter._id===taskDoc._id) ? taskDoc : null;
    }, "findOne");

    const requestObj = {
        params: {
            taskId: new mongoose.Types.ObjectId()
        }
    };
    const mockResponse = { 
        json: jest.fn(),
        status: jest.fn().mockReturnThis()  // status mock function also returns this mockResponse object (allow chaining functions)
    };

    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledTimes(0);

    await taskController.getTaskInfo(requestObj, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "Task not found"});
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(404);
});

test("Add new task successfully", async () => {
    const newTask = {
        taskName: "My new task",
        taskDescription: "My new task description"
    };

    requestObj = {
        body: newTask
    };
    
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);

    await taskController.addTask(requestObj, mockResponse);
    // Mockingoose has a default behavior for Task.create(), so a document object is returned without explicit mocking

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "New task created"});
});

test("Fail to add task with incomplete request body", async () => {
    const newTask = {
        taskName: "My new task",
        // Missing taskDescription
    };

    requestObj = {
        body: newTask
    };
    
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);

    await taskController.addTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "Must provide task name and description"});
});
