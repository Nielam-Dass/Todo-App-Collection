import { JSX, ReactNode } from "react";
import TodoRow from "./TodoRow";
import Task from "./Task";
import { useNavigate } from "react-router-dom";

interface TodoTableProps {
    tasks: Task[];
    deleteTodo(deleteId: string): void;
}

function TodoTable(props: TodoTableProps): JSX.Element {
    const navigate = useNavigate();

    const handleRemoveTask = (removeId: string): void => {
        props.deleteTodo(removeId);
    }

    const handleEditTask = (taskId: string) => {
        navigate(`/edit/${taskId}`);
    }

    if(props.tasks.length==0){
        return (
            <>
            <div className="no-tasks-message">There are no tasks left</div>
            </>
        )
    }
    return (
        <>
        <table className="main-todo-table">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Urgency Level</th>
                    <th>Edit Task</th>
                    <th>Remove Task</th>
                </tr>
            </thead>
            <tbody>
                {props.tasks.map((task: Task): ReactNode => {
                    return(
                        <TodoRow task={task} key={task.taskId} onRemove={() => handleRemoveTask(task.taskId)} onEdit={() => handleEditTask(task.taskId)}/>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default TodoTable
