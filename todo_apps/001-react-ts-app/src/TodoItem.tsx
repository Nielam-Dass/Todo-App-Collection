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
            <td><button>Edit</button></td>
            <td><button>Remove</button></td>
        </tr>
    )
}

export default TodoItem
