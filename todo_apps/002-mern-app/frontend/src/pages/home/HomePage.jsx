import { JSX } from "react"
import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../services/taskService";
import TaskList from "./TaskList";


/**
 * Home Page component
 * 
 * @returns {JSX.Element}
 */
function HomePage () {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks
  });

  return (
    <>
      <h1 style={{display: "flex", justifyContent: "center", fontSize: "3.5rem"}}>Todo App</h1>
      <TaskList tasksLoading={query.isLoading} taskList={query.data}/>
    </>
  );
}

export default HomePage;
