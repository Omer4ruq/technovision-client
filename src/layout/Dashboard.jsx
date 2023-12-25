import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import TodoList from "../components/to-do/TodoList";
import OngoingList from "../components/ongoing/OngoingList";
import CompletedList from "../components/completed/CompletedList";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
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

  const { photoURL, displayName } = user;
  return (
    <div>
      <div className="grid grid-flow-col-dense">
        <aside className="w-20 min-h-screen sm:w-40 bg-gray-900 text-gray-100">
          <nav className="">
            <div className="">
              <h2 className="text-sm font-semibold tracki uppercase text-gray-400 ">
                Getting Started
              </h2>
              <div className="flex items-center p-2 space-x-4">
                <img
                  src={photoURL}
                  alt=""
                  className="w-12 h-12 rounded-fullbg-gray-500"
                />
                <div>
                  <h2 className="text-lg font-semibold">{displayName}</h2>
                  <span className="flex items-center space-x-1">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs hover:underlinetext-gray-400"
                    >
                      View profile
                    </a>
                  </span>
                </div>
              </div>
              <ul className="menu p-4">
                <li>
                  <NavLink to="alltasks">ALl Tasks</NavLink>
                </li>
                <li>
                  <NavLink to="addtask">Add Task</NavLink>
                </li>

                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/drag">Drag</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        {/* <DndProvider backend={HTML5Backend}>
          <div style={{ display: "flex" }}>
            <TodoList tasks={tasks} />
            <OngoingList
              tasks={tasks}
              onTaskStatusChange={handleTaskStatusChange}
            />
            <CompletedList
              tasks={tasks}
              onTaskStatusChange={handleTaskStatusChange}
            />
          </div>
        </DndProvider> */}
        {/* <div className="grid grid-cols-3">
          <TodoList></TodoList>
          <OngoingList></OngoingList>
          <CompletedList></CompletedList>
        </div> */}
        <div className="flex-1 p-10 ml-16">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
