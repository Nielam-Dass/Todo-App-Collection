const taskController = require("../src/controllers/taskController");
const mockingoose = require("mockingoose");
const Task = require("../src/models/Task");
const mongoose = require("mongoose");


afterEach(() => {
    mockingoose.resetAll();  // Moved mockingoose.resetAll() to this test file to avoid interference with app integration tests
});

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

    const requestObj = {
        body: newTask
    };
    
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    const taskSchemaSpy = jest.spyOn(Task, "create");

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(taskSchemaSpy).toHaveBeenCalledTimes(0);

    await taskController.addTask(requestObj, mockResponse);
    // Mockingoose has a default behavior for Task.create(), so a document object is returned without explicit mocking

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "New task created"});
    expect(taskSchemaSpy).toHaveBeenCalledTimes(1);
    expect(taskSchemaSpy).toHaveBeenLastCalledWith(newTask);
});

test("Fail to add task with incomplete request body", async () => {
    const newTask = {
        taskName: "My new task",
        // Missing taskDescription
    };

    const requestObj = {
        body: newTask
    };
    
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    const taskSchemaSpy = jest.spyOn(Task, "create");

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(taskSchemaSpy).toHaveBeenCalledTimes(0);

    await taskController.addTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({message: "Must provide task name and description"});
    expect(taskSchemaSpy).toHaveBeenCalledTimes(0);
});

test("Successfully update task name", async () => {
    const originalTask = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false,
    };
    const taskDoc = {
        ...originalTask,
        save: jest.fn()  // save() method in document object can be used to update the task
    };
    const updatedTask = {
        ...originalTask,
        taskName: "My updated task name"
    };
    // Mockingoose findOne mock does NOT return an identical reference to the taskDoc object, so jest.spyOn() is more suitable here
    jest.spyOn(Task, "findById").mockResolvedValue(taskDoc);

    const requestObj = {
        params: {
            taskId: originalTask._id
        },
        body: updatedTask
    };
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(taskDoc.taskName).toBe("My task");
    expect(taskDoc.taskDescription).toBe("My task description");
    expect(taskDoc.taskCompleted).toBe(false);
    expect(taskDoc.save).toHaveBeenCalledTimes(0);

    await taskController.updateTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({ message: `Task ${taskDoc._id} has been updated` })
    expect(taskDoc.taskName).toBe("My updated task name");
    expect(taskDoc.taskDescription).toBe("My task description");
    expect(taskDoc.taskCompleted).toBe(false);
    expect(taskDoc._id).toBe(originalTask._id);
    expect(taskDoc.save).toHaveBeenCalledTimes(1);
});

test("Successfully update multiple task fields", async () => {
    const originalTask = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false,
    };
    const taskDoc = {
        ...originalTask,
        save: jest.fn()  // save() method in document object can be used to update the task
    };
    const updatedTask = {
        ...originalTask,
        taskName: "My updated task name",
        taskDescription: "My updated task description",
        taskCompleted: true
    };
    // Mockingoose findOne mock does NOT return an identical reference to the taskDoc object, so jest.spyOn() is more suitable here
    jest.spyOn(Task, "findById").mockResolvedValue(taskDoc);

    const requestObj = {
        params: {
            taskId: originalTask._id
        },
        body: updatedTask
    };
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(taskDoc.taskName).toBe("My task");
    expect(taskDoc.taskDescription).toBe("My task description");
    expect(taskDoc.taskCompleted).toBe(false);
    expect(taskDoc.save).toHaveBeenCalledTimes(0);

    await taskController.updateTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({ message: `Task ${taskDoc._id} has been updated` });
    expect(taskDoc.taskName).toBe("My updated task name");
    expect(taskDoc.taskDescription).toBe("My updated task description");
    expect(taskDoc.taskCompleted).toBe(true);
    expect(taskDoc._id).toBe(originalTask._id);
    expect(taskDoc.save).toHaveBeenCalledTimes(1);
});

test("Fail to update task with missing fields", async () => {
    const originalTask = {
        _id: new mongoose.Types.ObjectId(),
        taskName: "My task",
        taskDescription: "My task description",
        taskCompleted: false
    };
    const taskDoc = {
        ...originalTask,
        save: jest.fn()  // save() method in document object can be used to update the task
    };
    const updatedTask = {
        _id: originalTask._id,
        taskName: "My updated task name",
        // Missing fields taskDescription and taskCompleted
    };
    
    jest.spyOn(Task, "findById").mockResolvedValue(taskDoc);

    const requestObj = {
        params: {
            taskId: originalTask._id
        },
        body: updatedTask
    };
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);
    expect(taskDoc.taskName).toBe("My task");
    expect(taskDoc.taskDescription).toBe("My task description");
    expect(taskDoc.taskCompleted).toBe(false);
    expect(taskDoc.save).toHaveBeenCalledTimes(0);

    await taskController.updateTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({ message: "All fields are required to update a task" });
    expect(taskDoc.taskName).toBe("My task");
    expect(taskDoc.taskDescription).toBe("My task description");
    expect(taskDoc.taskCompleted).toBe(false);
    expect(taskDoc._id).toBe(originalTask._id);
    expect(taskDoc.save).toHaveBeenCalledTimes(0);
});

test("Fail to update nonexistent task", async () => {
    const updatedTask = {
        _id: new mongoose.Types.ObjectId(),  // Nonexistent task id
        taskName: "My updated task name",
        taskDescription: "My updated task description",
        taskCompleted: true
    };
    // findById returns null when no matching document is found
    jest.spyOn(Task, "findById").mockResolvedValue(null);

    const requestObj = {
        params: {
            taskId: updatedTask._id
        },
        body: updatedTask
    };
    const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
    };

    expect(mockResponse.status).toHaveBeenCalledTimes(0);
    expect(mockResponse.json).toHaveBeenCalledTimes(0);

    await taskController.updateTask(requestObj, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenLastCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith({ message: "Task not found" });
});
