import React, { JSX, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Task from "./Task";

interface EditTodoFormProps {
    tasks: Task[];
    editTodo(index: number, todo: Task): void;
}

function EditTodoForm(props: EditTodoFormProps): JSX.Element {
    // TODO: Create common UI form component to use in EditTodoForm and AddTodoForm
    const params = useParams() as {id: string};
    const taskIndex: number = parseInt(params.id);
    const taskId: string = props.tasks[taskIndex].taskId;
    const [todoName, setTodoName] = useState<string>(props.tasks[taskIndex].taskName);
    const [todoUrgency, setTodoUrgency] = useState<string>(props.tasks[taskIndex].taskUrgency.toString());
    const navigate = useNavigate();

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
        const todoUrgencyLevel: number = parseInt(todoUrgency);
        const todoNameTrimmed: string = todoName.trim();
        if(todoNameTrimmed.length == 0 || Number.isNaN(todoUrgencyLevel)) {
            alert("Must provide valid task name and urgency level!");
            return;
        }
        const updatedTask: Task = {
            taskName: todoNameTrimmed,
            taskUrgency: todoUrgencyLevel,
            taskId
        }
        props.editTodo(taskIndex, updatedTask);
        navigate('/');
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        navigate('/');
    }
    

    return (
        <>
            <h1>Edit Todo</h1>
            <p>Task ID: {taskId}</p>
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
