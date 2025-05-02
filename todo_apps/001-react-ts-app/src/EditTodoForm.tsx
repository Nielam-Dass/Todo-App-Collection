import React, { JSX, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Task from "./Task";
import NotFound from "./NotFound";
import TodoSpecForm from "./TodoSpecForm";

interface EditTodoFormProps {
    tasks: Task[];
    editTodo(todo: Task): void;
}

function EditTodoForm(props: EditTodoFormProps): JSX.Element {
    const params = useParams() as {id: string};
    const taskId: string = params.id;
    const currentTask: Task | undefined = props.tasks.find((task) => task.taskId===taskId);
    if(currentTask === undefined){
        return (
            <NotFound/>
        )
    }
    const [todoName, setTodoName] = useState<string>(currentTask.taskName);
    const [todoUrgency, setTodoUrgency] = useState<string>(currentTask.taskUrgency.toString());
    const navigate = useNavigate();

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
        props.editTodo(updatedTask);
        navigate('/');
    }

    const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        navigate('/');
    }
    

    return (
        <>
            <h1>Edit Todo</h1>
            <p>Task ID: {taskId}</p>
            <TodoSpecForm todoName={todoName} todoUrgency={todoUrgency} setTodoName={setTodoName} setTodoUrgency={setTodoUrgency}/>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}

export default EditTodoForm
