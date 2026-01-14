import { useNavigate } from "react-router-dom";
import trashCanIcon from "../../assets/trash_can.svg";


function TaskCard(props) {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  }
  
  return (
    <div style={{border: "1px solid black", borderRadius: "10px", padding: "20px 40px", fontSize: "2rem", display: "flex", alignItems: "center", gap: "8px"}}
      onClick={()=>handleTaskClick(props.task._id)}
    >
      <input type="checkbox" onClick={(e)=>e.stopPropagation()} style={{width: "2rem", height: "2rem"}}/>
      <span style={{flexGrow: 1}}>{props.task.taskName}</span>
      <button style={{padding: "4px"}} onClick={(e)=>e.stopPropagation()}>
        <img src={trashCanIcon} width={"28px"} height={"28px"}/>
      </button>
    </div>
  );
}

export default TaskCard;