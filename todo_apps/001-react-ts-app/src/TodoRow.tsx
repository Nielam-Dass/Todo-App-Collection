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
            <td>{props.task.taskName}</td>
            <td>{props.task.taskUrgency}</td>
            <td>
                <button onClick={props.onEdit} className="edit-btn mini-btn">Edit</button>
            </td>
            <td>
                <button onClick={props.onRemove} className="remove-btn mini-btn">Remove</button>
            </td>
        </tr>
    )
}

export default TodoRow
