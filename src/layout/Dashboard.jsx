import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import TodoList from "../components/to-do/TodoList";
import OnGoing from "../components/ongoing/OnGoing";
import Completed from "../components/completed/Completed";

const Dashboard = () => {
  // const isAdmin = true;
  const { user } = useContext(AuthContext);
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
                  src={user.photoURL}
                  alt=""
                  className="w-12 h-12 rounded-fullbg-gray-500"
                />
                <div>
                  <h2 className="text-lg font-semibold">{user.displayName}</h2>
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
              </ul>
            </div>
          </nav>
        </aside>
        <div className="grid grid-cols-3">
          <TodoList></TodoList>
          <OnGoing></OnGoing>
          <Completed></Completed>
        </div>
        <div className="flex-1 p-10 ml-16">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
