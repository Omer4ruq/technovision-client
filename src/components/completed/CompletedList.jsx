// CompletedList.js
import React from "react";
import { useDrop } from "react-dnd";
import Task from "../tasks/Task";

const ItemType = "TASK";

const CompletedList = ({ tasks = [], onTaskStatusChange }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      onTaskStatusChange(item.id, "completed");
    },
  });

  return (
    <div
      ref={drop}
      style={{ flex: 1, border: "1px solid", padding: "16px", margin: "8px" }}
    >
      <h2>Completed</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default CompletedList;
