import { JSX, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import Task from "./Task";

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(newTask: Task): void{
    setTasks((t: Task[]): Task[] => {
      return [...t, newTask];
    });
  }

  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm addTodo={addTask}/>
      <TodoList tasks={tasks}/>
    </>
  )
}

export default App
