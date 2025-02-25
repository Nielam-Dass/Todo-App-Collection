interface TodoProps {
    taskName: string;
}

function TodoItem(props: TodoProps){
    return (
            <div>{props.taskName}</div>
    )
}

export default TodoItem
