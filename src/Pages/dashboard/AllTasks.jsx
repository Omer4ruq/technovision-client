import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthContext } from "../../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";

const ItemType = "TASK";

// const [article, , refetch] = useArticles();

const Task = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ border: "1px solid black", padding: "8px", marginBottom: "4px" }}
    >
      {task.title}
    </div>
  );
};

const TaskList = ({ title, tasks, moveTask }) => {
  return (
    <div style={{ width: "200px", marginRight: "16px" }}>
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <Task key={task.id} index={index} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
};

const AllTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const url = `https://scc-technovision-inc-server-nu.vercel.app/my-tasks?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data));
    console.log(tasks);
  }, []);
  //   const [tasks, setTasks] = useState([
  //     { id: 1, title: "Task 1" },
  //     { id: 2, title: "Task 2" },
  //     { id: 3, title: "Task 3" },
  //   ]);

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [removedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, removedTask);
    setTasks(updatedTasks);
  };

  const toDoList = tasks.filter((task) => task.status === "todo");
  const ongoingList = tasks.filter((task) => task.status === "ongoing");
  const completedList = tasks.filter((task) => task.status === "completed");

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <TaskList title="To Do" tasks={toDoList} moveTask={moveTask} />
        <TaskList title="Ongoing" tasks={ongoingList} moveTask={moveTask} />
        <TaskList title="Completed" tasks={completedList} moveTask={moveTask} />
      </div>
    </DndProvider>
  );
};

export default AllTasks;
