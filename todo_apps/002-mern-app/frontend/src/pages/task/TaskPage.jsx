import { useParams } from "react-router-dom";
import { fetchOneTask } from "../../services/taskService";


function TaskPage () {
  const { taskId } = useParams();
  const task = fetchOneTask(taskId);

  return (
    <>
    <div>Task ID: {task._id}</div>
    <div>Task Name: {task.taskName}</div>
    <div>Task Description: {task.taskDescription}</div>
    </>
  );
}

export default TaskPage;
