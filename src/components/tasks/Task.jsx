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
      style={{ border: "1px solid", padding: "20px", marginBottom: "20px" }}
    >
      <h1 className="text-black text-2xl">{title}</h1>
      <div className="flex gap-3 ml-12 text-blue-500 ">
        <h1 className="hover:underline">Delete</h1>
        <h1 className="hover:underline">Edit</h1>
      </div>
    </div>
  );
};

export default Task;
