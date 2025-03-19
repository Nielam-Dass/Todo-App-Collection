import { JSX, ReactNode } from "react";
import TodoRow from "./TodoRow";
import Task from "./Task";
import "./todo-list-styles.css"

interface TodoTableProps {
    tasks: Task[];
    deleteTodo(index: number): void;
}

function TodoTable(props: TodoTableProps): JSX.Element {
    const handleRemoveTask = (index: number): void => {
        props.deleteTodo(index);
    }

    const handleEditTask = (index: number) => {
        throw new Error("handleEditTask function not implemented yet");
    }

    if(props.tasks.length==0){
        return (
            <>
            <div>There are no tasks left</div>
            </>
        )
    }
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Urgency Level</th>
                    <th>Edit Task</th>
                    <th>Remove Task</th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map((task: Task, index: number): ReactNode => {
                    return(
                        <TodoRow task={task} key={index} onRemove={() => handleRemoveTask(index)} onEdit={() => handleEditTask(index)}/>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default TodoTable
