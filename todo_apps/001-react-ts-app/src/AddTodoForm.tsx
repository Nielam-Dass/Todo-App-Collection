import React, { useState } from "react"

interface AddTodoFormProps {
    addTodo(todo: string): void
}

function AddTodoForm(props: AddTodoFormProps) {
    const [todoName, setTodoName] = useState<string>("");
    const [todoUrgency, setTodoUrgency] = useState<number>(1);
    
    const handleTodoNameChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTodoName((): string => {
            return event.target.value;
        });
    }

    const handleTodoUrgencyChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTodoUrgency((): number => {
            return parseInt(event.target.value);
        });
    }

    const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        const todo: string = todoName;
        props.addTodo(todo);
    }

    return (
        <>
            <label htmlFor="todo-name">Task Name: </label>
            <input type="text" onChange={handleTodoNameChange} value={todoName} className="todo-name-input" id="todo-name"/>
            <br></br>
            <label htmlFor="todo-urgency">Task Urgency Level (1-10): </label>
            <input type="number" onChange={handleTodoUrgencyChange} value={!Number.isNaN(todoUrgency) ? todoUrgency : ""} min="1" max="10" className="todo-urgency-input" id="todo-urgency"/>
            <br></br>
            <button onClick={handleAdd}>Add Todo</button>
        </>
    )
}

export default AddTodoForm
