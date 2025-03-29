import React, { JSX, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Task from "./Task";

interface EditTodoFormProps {
    tasks: Task[];
}

function EditTodoForm(props: EditTodoFormProps): JSX.Element {
    // TODO: Create common UI form component to use in EditTodoForm and AddTodoForm
    const params = useParams() as {id: string};
    const taskId: number = parseInt(params.id);
    const [todoName, setTodoName] = useState<string>(props.tasks[taskId].taskName);
    const [todoUrgency, setTodoUrgency] = useState<string>(props.tasks[taskId].taskUrgency.toString());

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

    const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        throw new Error("Edit function not implemented yet");
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        throw new Error("Cancel function not implemented yet");
    }
    

    return (
        <>
            <h1>Edit todo form for task at index {params.id}</h1>
            <Link to={"/"}>Home</Link>
            <br></br>
            <label htmlFor="todo-name">Task Name: </label>
            <input type="text" onChange={handleTodoNameChange} value={todoName} className="todo-name-input" id="todo-name"/>
            <br></br>
            <label htmlFor="todo-urgency">Task Urgency Level (1-10): </label>
            <input type="number" onChange={handleTodoUrgencyChange} value={todoUrgency} min="1" max="10" className="todo-urgency-input" id="todo-urgency"/>
            <br></br>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}

export default EditTodoForm
