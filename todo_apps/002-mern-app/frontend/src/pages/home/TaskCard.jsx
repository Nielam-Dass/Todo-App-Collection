function TaskCard(props) {
  return (
    <h1 style={{border: "1px solid black"}}>{props.task.taskName}</h1>
  );
}

export default TaskCard;