import { JSX } from "react";
import Task from "./Task";

interface TodoProps {
    task: Task;
}

function TodoItem(props: TodoProps): JSX.Element {
    return (
            <div>{props.task.taskName}</div>
    )
}

export default TodoItem
