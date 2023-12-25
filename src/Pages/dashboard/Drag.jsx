// App.js
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoList from "../../components/to-do/TodoList";
import OngoingList from "../../components/ongoing/OngoingList";
import CompletedList from "../../components/completed/CompletedList";

const Drag = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from MongoDB or your API
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      // Send a PUT request to update the task status in the database
      await fetch(
        `https://scc-technovision-inc-server-nu.vercel.app/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // Update the local state to reflect the changes
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        <TodoList tasks={tasks.filter((task) => task.status === "todo")} />s
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

export default Drag;
