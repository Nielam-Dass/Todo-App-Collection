import { useState } from "react"
import AddTodoForm from "./AddTodoForm"
import TodoList from "./TodoList"

function App() {
  const [tasks, setTasks] = useState<string[]>(["Task 1", "Task 2", "Task 3", "Task 4"]);

  function addTask(newTask: string){
    setTasks((t): string[] => {
      return [...t, newTask]
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
