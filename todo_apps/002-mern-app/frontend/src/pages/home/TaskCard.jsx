import { JSX } from "react"
import { useNavigate } from "react-router-dom";
import trashCanIcon from "../../assets/trash_can.svg";

/**
 * Task Card component
 * 
 * @param {object} props
 * @param {object} props.task Task object containing details to display in card
 * @returns {JSX.Element}
 */
function TaskCard(props) {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  }
  
  return (
    <div className="task-card"
      onClick={()=>handleTaskClick(props.task._id)}
    >
      <input type="checkbox" onClick={(e)=>e.stopPropagation()} className="completion-checkbox"/>
      <span>{props.task.taskName}</span>
      <button onClick={(e)=>e.stopPropagation()}>
        <img src={trashCanIcon} width={"28px"} height={"28px"}/>
      </button>
    </div>
  );
}

export default TaskCard;