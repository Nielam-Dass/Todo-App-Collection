import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../services/taskService";
import TaskList from "./TaskList";


function HomePage () {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks
  });

  if(query.isLoading) {
    return (
      <div>Loading Tasks...</div>
    );
  }

  return (
    <>
      <TaskList taskList={query.data}/>
    </>
  );
}

export default HomePage;
