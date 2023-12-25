// Task.js
import React from "react";
import { useDrag } from "react-dnd";

const ItemType = "TASK";

const Task = ({ task }) => {
  console.log(task);
  const { title } = task;
  console.log(title);
  const [, drag] = useDrag({
    type: ItemType,
    // item: { tasks.id, title, status },
  });

  return (
    <div
      ref={drag}
      style={{ border: "1px solid", padding: "8px", marginBottom: "8px" }}
    >
      <h1 className="text-black">{title}</h1>
    </div>
  );
};

export default Task;
