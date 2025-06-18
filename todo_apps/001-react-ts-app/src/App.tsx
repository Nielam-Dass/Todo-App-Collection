import { JSX, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Task from "./Task";
import TodoHome from "./TodoHome";
import EditTodoForm from "./EditTodoForm";
import NotFound from "./NotFound";

function App(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(newTask: Task): void{
    setTasks((t: Task[]): Task[] => {
      let tasksUpdated: Task[] = [];
      let taskInserted: boolean = false;

      for(let i: number=0; i<t.length; i++){
        if(!taskInserted && (newTask.taskUrgency > t[i].taskUrgency)){
          tasksUpdated.push(newTask);
          taskInserted = true;
        }
        tasksUpdated.push(t[i]);
      }
      if(!taskInserted){
        tasksUpdated.push(newTask);
        taskInserted = true;
      }

      return tasksUpdated;
    });
  }

  function deleteTask(deleteId: string): void{
    setTasks((t: Task[]): Task[] => t.filter((element: Task) => element.taskId!==deleteId));
  }

  function updateTask(updatedTask: Task): void{
    setTasks((t: Task[]): Task[] => {
      let updatedTasks: Task[] = t.filter((value: Task) => value.taskId!==updatedTask.taskId);
      let insertIndex = 0;
      while(insertIndex<updatedTasks.length && updatedTasks[insertIndex].taskUrgency>=updatedTask.taskUrgency)
        insertIndex++;
      updatedTasks.splice(insertIndex, 0, updatedTask);
      return updatedTasks;
    });
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
