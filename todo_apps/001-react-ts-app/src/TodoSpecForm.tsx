import React, { JSX } from "react";

interface TodoSpecFormProps {
    todoName: string;
    todoUrgency: string;
    setTodoName: React.Dispatch<React.SetStateAction<string>>;
    setTodoUrgency: React.Dispatch<React.SetStateAction<string>>;
}

function TodoSpecForm({ todoName, todoUrgency, setTodoName, setTodoUrgency }: TodoSpecFormProps): JSX.Element {
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

    return (
        <>
        <label htmlFor="todo-name" className="todo-name-input-label">Task Name: </label>
        <input type="text" onChange={handleTodoNameChange} value={todoName} className="todo-name-input-field" id="todo-name"/>
        <br></br>
        <label htmlFor="todo-urgency" className="todo-urgency-input-label">Task Urgency Level (1-10): </label>
        <input type="number" inputMode="numeric" onChange={handleTodoUrgencyChange} value={todoUrgency} min="1" max="10" className="todo-urgency-input-field" id="todo-urgency"/>
        <br></br>
        </>
    )
}

export default TodoSpecForm
