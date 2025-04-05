import { JSX } from "react";
import Task from "./Task";

interface TodoRowProps {
    task: Task;
    onRemove(): void;
    onEdit(): void;
}

function TodoRow(props: TodoRowProps): JSX.Element {
    return (
        <tr>
            <td>{props.task.taskId}</td>
            <td>{props.task.taskName}</td>
            <td>{props.task.taskUrgency}</td>
            <td>
                <button onClick={props.onEdit}>Edit</button>
            </td>
            <td>
                <button onClick={props.onRemove}>Remove</button>
            </td>
        </tr>
    )
}

export default TodoRow
