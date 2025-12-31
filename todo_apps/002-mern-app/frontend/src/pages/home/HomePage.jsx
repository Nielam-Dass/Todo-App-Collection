import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../../services/taskService";


function HomePage () {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchAllTasks
  });
  console.log(query.data);
  
  return (
    <div>Home - TODO Root Route</div>
  );
}

export default HomePage;
