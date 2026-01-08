import TaskCard from "./TaskCard";

function TaskList(props) {
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
