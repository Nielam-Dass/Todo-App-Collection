import { JSX, ReactNode } from "react";
import TodoRow from "./TodoRow";
import Task from "./Task";
import "./todo-list-styles.css"

interface TodoTableProps {
    tasks: Task[];
}

function TodoTable(props: TodoTableProps): JSX.Element {
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
                        <TodoRow task={task} key={index}/>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default TodoTable
