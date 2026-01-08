function TaskCard(props) {
  return (
    <div style={{border: "1px solid black", borderRadius: "10px", padding: "20px 40px", fontSize: "2rem"}}>{props.task.taskName}</div>
  );
}

export default TaskCard;