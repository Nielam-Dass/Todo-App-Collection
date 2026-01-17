import TaskCard from "./TaskCard";

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
