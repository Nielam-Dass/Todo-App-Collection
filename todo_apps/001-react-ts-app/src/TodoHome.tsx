import { JSX, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoTable from "./TodoTable";
import Task from "./Task";

function TodoHome(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(newTask: Task): void{
    setTasks((t: Task[]): Task[] => {
      return [...t, newTask];
    });
  }

  function deleteTask(index: number): void{
    setTasks((t: Task[]): Task[] => t.filter((_element: Task, idx: number) => idx!==index));
  }

  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm addTodo={addTask}/>
      <TodoTable tasks={tasks} deleteTodo={deleteTask}/>
    </>
  )
}

export default TodoHome
