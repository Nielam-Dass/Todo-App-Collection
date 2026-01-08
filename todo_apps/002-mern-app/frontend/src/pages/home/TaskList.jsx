import TaskCard from "./TaskCard";

function TaskList(props) {
  return (
    <>
    {props.taskList.map((task) => <TaskCard task={task} key={task._id}/>)}
    </>
  );
}

export default TaskList;
