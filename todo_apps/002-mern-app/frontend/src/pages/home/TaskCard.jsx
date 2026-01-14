import { useNavigate } from "react-router-dom";


function TaskCard(props) {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  }
  
  return (
    <div style={{border: "1px solid black", borderRadius: "10px", padding: "20px 40px", fontSize: "2rem"}}
      onClick={()=>handleTaskClick(props.task._id)}
    >
      {props.task.taskName}
    </div>
  );
}

export default TaskCard;