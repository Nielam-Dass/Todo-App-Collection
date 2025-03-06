import { ReactNode } from "react";
import TodoItem from "./TodoItem";
import Task from "./Task";

interface TodoListProps {
    tasks: Task[];
}

function TodoList(props: TodoListProps){
    return (
        <>
        <ul>
            {props.tasks.map((task: Task, index: number): ReactNode => {
                return(
                    <li key={index}>
                        <TodoItem task={task}/>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default TodoList
