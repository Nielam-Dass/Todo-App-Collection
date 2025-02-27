import { ReactNode } from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
    tasks: string[];
}

function TodoList(props: TodoListProps){
    return (
        <>
        <ul>
            {props.tasks.map((task: string, index: number): ReactNode => {
                return(
                    <li key={index}>
                        <TodoItem taskName={task}/>
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default TodoList
