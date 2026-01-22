// Delay utility function to simulate latency (will remove later)
const delay = (delayTime) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delayTime);
    });
}

// List of fake tasks
const mockTasks = [
    {
        _id: "1",
        taskName: "First Task",
        taskDescription: "My first task",
        taskCompleted: false,
    },
    {
        _id: "2",
        taskName: "Second Task",
        taskDescription: "My second task",
        taskCompleted: false,
    },
    {
        _id: "3",
        taskName: "Third Task",
        taskDescription: "My third task",
        taskCompleted: true,
    },
    {
        _id: "4",
        taskName: "Fourth Task",
        taskDescription: "My fourth task",
        taskCompleted: false,
    }
];

// TODO: Query backend to fetch all tasks
export const fetchAllTasks = async () => {
    await delay(2000);
    return mockTasks;
}
