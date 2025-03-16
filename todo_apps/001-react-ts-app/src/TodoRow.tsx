import { JSX } from "react";
import Task from "./Task";

interface TodoRowProps {
    task: Task;
}

function TodoRow(props: TodoRowProps): JSX.Element {
    return (
        <tr>
            <td>{props.task.taskName}</td>
            <td>{props.task.taskUrgency}</td>
            <td><button>Edit</button></td>
            <td><button>Remove</button></td>
        </tr>
    )
}

export default TodoRow
