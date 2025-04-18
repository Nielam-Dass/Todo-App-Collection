import { JSX, useState } from "react";
import TodoHome from "./TodoHome";
import { Route, Routes } from "react-router-dom";
import Task from "./Task";
import EditTodoForm from "./EditTodoForm";
import NotFound from "./NotFound";

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

  function updateTask(updatedTask: Task): void{
    setTasks((t: Task[]): Task[] => t.map((value: Task) => value.taskId===updatedTask.taskId ? updatedTask : value))
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoHome tasks={tasks} addTask={addTask} deleteTask={deleteTask}/>}/>
        <Route path="/edit/:id" element={<EditTodoForm tasks={tasks} editTodo={updateTask}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
