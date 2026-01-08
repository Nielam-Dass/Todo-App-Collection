import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import TaskPage from "./pages/task/TaskPage";

import "./styles.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/task/:taskId" element={<TaskPage/>}/>
      </Routes>
    </>
  );
}

export default App;
