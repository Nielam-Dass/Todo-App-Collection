import { useState } from "react"
import AddTodoForm from "./AddTodoForm"
import TodoList from "./TodoList"

function App() {
  const [tasks, setTasks] = useState<string[]>(["Task 1", "Task 2", "Task 3", "Task 4"]);

  return (
    <>
      <h1>Todo App</h1>
      <AddTodoForm />
      <TodoList tasks={tasks}/>
    </>
  )
}

export default App
