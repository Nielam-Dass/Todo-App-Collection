import { ReactNode } from "react";
import TodoItem from "./TodoItem";

function TodoList(){
    const tasks: string[] = ["Task 1", "Task 2", "Task 3"];

    return (
        <>
        <ul>
            {tasks.map((task: string, index: number): ReactNode => {
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
