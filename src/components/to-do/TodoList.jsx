// TodoList.js
import React from "react";
import Task from "../tasks/Task";

const TodoList = ({ tasks }) => {
  const { title } = tasks;
  console.log(title);
  return (
    <div
      style={{ flex: 1, border: "1px solid", padding: "16px", margin: "8px" }}
    >
      <h2>Todo</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TodoList;
