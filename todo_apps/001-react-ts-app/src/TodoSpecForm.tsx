import React, { JSX } from "react";

interface TodoSpecFormProps {
    todoName: string;
    todoUrgency: string;
    setTodoName: React.Dispatch<React.SetStateAction<string>>;
    setTodoUrgency: React.Dispatch<React.SetStateAction<string>>;
}

function TodoSpecForm(props: TodoSpecFormProps): JSX.Element {
    return (
        <>
        TodoSpecForm
        </>
    )
}

export default TodoSpecForm
