import { JSX } from "react"
import TaskCard from "./TaskCard";


/**
 * Task List component
 * 
 * @param {object} props
 * @param {boolean} props.tasksLoading Whether tasks are still being retrieved
 * @param {Array} props.taskList List of task objects
 * @returns {JSX.Element}
 */
function TaskList(props) {
  if(props.tasksLoading) {
    return (
      <div style={{display: "flex", justifyContent: "center", fontSize: "1.5rem"}}>Task Loading...</div>
    )
  }
  return (
    <>
    <div className="task-list">
      {props.taskList.map((task) => <TaskCard task={task} key={task._id}/>)}
    </div>
    </>
  );
}

export default TaskList;
