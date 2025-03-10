import { JSX } from "react";
import Task from "./Task";

interface TodoProps {
    task: Task;
}

function TodoItem(props: TodoProps): JSX.Element {
    return (
        <tr>
            <td>{props.task.taskName}</td>
            <td>{props.task.taskUrgency}</td>
        </tr>
    )
}

export default TodoItem
