import React, { useState } from "react"
import Task from "./Task";

interface AddTodoFormProps {
    addTodo(todo: Task): void;
}

function AddTodoForm(props: AddTodoFormProps) {
    const [todoName, setTodoName] = useState<string>("");
    const [todoUrgency, setTodoUrgency] = useState<string>("");
    
    const handleTodoNameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTodoName((): string => {
            return event.target.value;
        });
    }

    const handleTodoUrgencyChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTodoUrgency((tu: string): string => {
            const urgencyLevel: number = parseInt(event.target.value);
            if(Number.isNaN(urgencyLevel)) {
                return "";
            }
            else if(urgencyLevel>=1 && urgencyLevel<=10) {
                return urgencyLevel.toString();
            }
            return tu;
        });
    }

    const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        const newTodo: Task = {
            taskName: todoName,
            taskUrgency: parseInt(todoUrgency)
        }
        props.addTodo(newTodo);
    }

    return (
        <>
            <label htmlFor="todo-name">Task Name: </label>
            <input type="text" onChange={handleTodoNameChange} value={todoName} className="todo-name-input" id="todo-name"/>
            <br></br>
            <label htmlFor="todo-urgency">Task Urgency Level (1-10): </label>
            <input type="number" onChange={handleTodoUrgencyChange} value={todoUrgency} min="1" max="10" className="todo-urgency-input" id="todo-urgency"/>
            <br></br>
            <button onClick={handleAdd}>Add Todo</button>
        </>
    )
}

export default AddTodoForm
