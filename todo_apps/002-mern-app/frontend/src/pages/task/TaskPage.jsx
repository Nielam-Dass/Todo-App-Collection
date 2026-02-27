import { JSX } from "react"
import { Link, useParams } from "react-router-dom";
import { fetchOneTask } from "../../services/taskService";


/**
 * Task Page component
 * 
 * @returns {JSX.Element}
 */
function TaskPage () {
  const { taskId } = useParams();
  const task = fetchOneTask(taskId);

  return (
    <>
    <Link to={"/"}>&lt;&lt; Back to Home</Link>
    <div>Task ID: {task._id}</div>
    <div>Task Name: {task.taskName}</div>
    <div>Task Description: {task.taskDescription}</div>
    </>
  );
}

export default TaskPage;
