import React, { JSX, useState } from "react"
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";
import TodoSpecForm from "./TodoSpecForm";

interface AddTodoFormProps {
    addTodo(todo: Task): void;
}

function AddTodoForm(props: AddTodoFormProps): JSX.Element {
    const [todoName, setTodoName] = useState<string>("");
    const [todoUrgency, setTodoUrgency] = useState<string>("");

    const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        const todoUrgencyLevel: number = parseInt(todoUrgency);
        const todoNameTrimmed: string = todoName.trim();
        if(todoNameTrimmed.length == 0 || Number.isNaN(todoUrgencyLevel)) {
            alert("Must provide valid task name and urgency level!");
            return;
        }
        const newTodo: Task = {
            taskName: todoNameTrimmed,
            taskUrgency: todoUrgencyLevel,
            taskId: uuidv4()
        }
        props.addTodo(newTodo);
        setTodoName("");
        setTodoUrgency("");
    }

    return (
        <>
            <TodoSpecForm todoName={todoName} todoUrgency={todoUrgency} setTodoName={setTodoName} setTodoUrgency={setTodoUrgency}/>
            <button onClick={handleAdd} className="add-btn">Add Todo</button>
        </>
    )
}

export default AddTodoForm
