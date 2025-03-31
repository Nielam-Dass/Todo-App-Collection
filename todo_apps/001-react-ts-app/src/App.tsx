import { JSX, useState } from "react";
import TodoHome from "./TodoHome";
import { Route, Routes } from "react-router-dom";
import Task from "./Task";
import EditTodoForm from "./EditTodoForm";

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(newTask: Task): void{
    setTasks((t: Task[]): Task[] => {
      return [...t, newTask];
    });
  }

  function deleteTask(index: number): void{
    setTasks((t: Task[]): Task[] => t.filter((_element: Task, idx: number) => idx!==index));
  }

  function updateTask(updateIndex: number, updatedTask: Task): void{
    setTasks((t: Task[]): Task[] => t.map((value: Task, index: number) => index===updateIndex ? updatedTask : value))
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoHome tasks={tasks} addTask={addTask} deleteTask={deleteTask}/>}/>
        <Route path="/edit/:id" element={<EditTodoForm tasks={tasks} editTodo={updateTask}/>}/>
      </Routes>
    </>
  )
}

export default App
