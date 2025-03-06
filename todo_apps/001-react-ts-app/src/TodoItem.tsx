import Task from "./Task";

interface TodoProps {
    task: Task;
}

function TodoItem(props: TodoProps){
    return (
            <div>{props.task.taskName}</div>
    )
}

export default TodoItem
