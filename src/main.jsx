import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import SignUp from "./Pages/Signup/SignUp.jsx";
import Main from "./layout/Main.jsx";
import AuthProvider from "./providers/AuthProviders.jsx";
import Login from "./Pages/Login/Login.jsx";
import AllTasks from "./Pages/dashboard/AllTasks.jsx";
import AddTasks from "./Pages/dashboard/AddTasks.jsx";
import Dashboard from "./layout/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "alltasks",
        element: <AllTasks></AllTasks>,
      },
      {
        path: "addtask",
        element: <AddTasks></AddTasks>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
