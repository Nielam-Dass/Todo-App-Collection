import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../services/taskService";


function HomePage () {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks
  });

  if(query.data) {
    return (
      <>
      {query.data.map((task) => <div key={task._id}>{task.taskName}</div>)}
      </>
    )
  }
  else {
    return (
      <div>Home - TODO Root Route</div>
    );
  }
}

export default HomePage;
