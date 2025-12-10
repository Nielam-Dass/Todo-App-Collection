import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>TODO ROOT ROUTE</h1>}/>
        <Route path="/task/:taskId" element={<h1>TODO TASK ROUTE</h1>}/>
      </Routes>
    </>
  );
}

export default App;
