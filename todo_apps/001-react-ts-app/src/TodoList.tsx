import { JSX, ReactNode } from "react";
import TodoItem from "./TodoItem";
import Task from "./Task";
import "./todo-list-styles.css"

interface TodoListProps {
    tasks: Task[];
}

function TodoList(props: TodoListProps): JSX.Element {
    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Urgency Level</th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map((task: Task, index: number): ReactNode => {
                    return(
                        <TodoItem task={task} key={index}/>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default TodoList
