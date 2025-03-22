import { JSX } from "react";
import TodoHome from "./TodoHome";
import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoHome />}/>
        <Route path="/edit" element={<h1>Edit page</h1>}/>
      </Routes>
    </>
  )
}

export default App
