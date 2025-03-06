import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      taskName: "Task 1",
      taskUrgency: 4
    },
    {
      taskName: "Task 2",
      taskUrgency: 8
    },
    {
      taskName: "Task 3",
      taskUrgency: 7
    },
  ]);

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
