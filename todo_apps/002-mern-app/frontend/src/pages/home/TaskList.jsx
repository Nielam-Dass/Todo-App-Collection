import TaskCard from "./TaskCard";

function TaskList(props) {
  if(props.tasksLoading) {
    return (
      <div style={{display: "flex", justifyContent: "center", fontSize: "1.5rem"}}>Task Loading...</div>
    )
  }
  return (
    <>
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "10px 80px"
    }}>
      {props.taskList.map((task) => <TaskCard task={task} key={task._id}/>)}
    </div>
    </>
  );
}

export default TaskList;
