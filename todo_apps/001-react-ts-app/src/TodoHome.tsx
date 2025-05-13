import { JSX } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoTable from "./TodoTable";
import Task from "./Task";

interface TodoHomeProps {
  tasks: Task[];
  addTask(task: Task): void;
  deleteTask(deleteId: string): void;
}

function TodoHome(props: TodoHomeProps): JSX.Element {
  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm addTodo={props.addTask}/>
      <TodoTable tasks={props.tasks} deleteTodo={props.deleteTask}/>
    </>
  )
}

export default TodoHome
