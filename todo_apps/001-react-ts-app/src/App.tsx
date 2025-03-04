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

  function addTask(newTask: string){
    setTasks((t: Task[]): Task[] => {
      return [...t, {taskName: newTask, taskUrgency: 1}];  // Will allow taskUrgency to be set by argument in future
    })
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
