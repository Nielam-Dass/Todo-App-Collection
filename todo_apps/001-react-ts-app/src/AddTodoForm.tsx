import React, { JSX, useState } from "react"
import Task from "./Task";

interface AddTodoFormProps {
    addTodo(todo: Task): void;
}

function AddTodoForm(props: AddTodoFormProps): JSX.Element {
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
        const todoUrgencyLevel: number = parseInt(todoUrgency);
        const todoNameTrimmed: string = todoName.trim();
        if(todoNameTrimmed.length == 0 || Number.isNaN(todoUrgencyLevel)) {
            alert("Must provide valid task name and urgency level!");
            return;
        }
        const newTodo: Task = {
            taskName: todoNameTrimmed,
            taskUrgency: todoUrgencyLevel
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
