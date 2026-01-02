import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../services/taskService";


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
    {query.data.map((task) => <div key={task._id}>{task.taskName}</div>)}
    </>
  );
}

export default HomePage;
