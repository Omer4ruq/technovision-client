import React, { useContext, useState, useEffect } from "react";

import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoList from "../../components/to-do/TodoList";
import OngoingList from "../../components/ongoing/OngoingList";
import CompletedList from "../../components/completed/CompletedList";

const ItemType = "TASK";

// const [article, , refetch] = useArticles();

// const Task = ({ task, index, moveTask }) => {
//   const [, ref] = useDrag({
//     type: ItemType,
//     item: { index },
//   });

//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover: (draggedItem) => {
//       if (draggedItem.index !== index) {
//         moveTask(draggedItem.index, index);
//         draggedItem.index = index;
//       }
//     },
//   });

//   return (
//     <div
//       ref={(node) => ref(drop(node))}
//       style={{ border: "1px solid black", padding: "8px", marginBottom: "4px" }}
//     >
//       {task.title}
//     </div>
//   );
// };

// const TaskList = ({ title, tasks, moveTask }) => {
//   return (
//     <div style={{ width: "200px", marginRight: "16px" }}>
//       <h3>{title}</h3>
//       {tasks.map((task, index) => (
//         <Task key={task.id} index={index} task={task} moveTask={moveTask} />
//       ))}
//     </div>
//   );
// };

const AllTasks = () => {
  // const { user } = useContext(AuthContext);
  // let tasks = useLoaderData();
  // console.log(tasks);
  // const isAdmin = true;
  let [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   // Fetch tasks from MongoDB or your API
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         // `https://scc-technovision-inc-server-nu.vercel.app/my-tasks?email=${user?.email}`
  //         `https://scc-technovision-inc-server-nu.vercel.app/my-tasks`
  //       );
  //       const data = await response.json();
  //       setTasks(data);
  //       console.log(tasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const url = `https://scc-technovision-inc-server-nu.vercel.app/my-tasks`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTasks(data));
    console.log(tasks);
  }, []);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      // Send a PUT request to update the task status in the database
      await fetch(
        `https://scc-technovision-inc-server-nu.vercel.app/my-tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // Update the local state to reflect the changes
      setTasks = (prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <TodoList tasks={tasks.filter((task) => task.status === "todo")} />
        <OngoingList
          tasks={tasks.filter((task) => task.status === "ongoing")}
          onTaskStatusChange={handleTaskStatusChange}
        />
        <CompletedList
          tasks={tasks.filter((task) => task.status === "completed")}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    </DndProvider>
  );
};

export default AllTasks;
