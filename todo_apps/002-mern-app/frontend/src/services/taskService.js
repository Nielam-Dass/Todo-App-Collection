// TODO: Query backend to fetch all tasks
export const fetchAllTasks = async () => {
    return [
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
}
