import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Task from "./pages/task/Task";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/task/:taskId" element={<Task/>}/>
      </Routes>
    </>
  );
}

export default App;
