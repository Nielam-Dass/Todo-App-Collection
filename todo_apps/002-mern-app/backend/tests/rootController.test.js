const rootController = require("../src/controllers/rootController");
const mockingoose = require("mockingoose");
const Task = require("../src/models/Task");


test("Get array of all tasks", async () => {
    const taskList = [
        {
            taskName: "Task 1",
            taskDescription: "The first task",
            taskCompleted: false
        },
        {
            taskName: "Task 2",
            taskDescription: "The second task",
            taskCompleted: false
        },
        {
            taskName: "Task 3",
            taskDescription: "The last task",
            taskCompleted: true
        }
    ];
    mockingoose(Task).toReturn(taskList, "find");

    const mockResponse = { json: jest.fn() };
    expect(mockResponse.json).toHaveBeenCalledTimes(0);

    await rootController.getAllTasks(null, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json.mock.calls[0][0]).toHaveLength(3);
    expect(mockResponse.json).toHaveBeenLastCalledWith(taskList.map((task) => expect.objectContaining(task)));
});

test("Get empty array when there are no tasks", async () => {
    mockingoose(Task).toReturn([], "find");
    
    const mockResponse = { json: jest.fn() };
    expect(mockResponse.json).toHaveBeenCalledTimes(0);

    await rootController.getAllTasks(null, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenLastCalledWith([]);
});
