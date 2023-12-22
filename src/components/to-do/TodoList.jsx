import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTask] = useState([]);
  const url = `http://localhost:5000/my-tasks?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTask(data));
    console.log(tasks);
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>To Do List</th>
            </tr>
          </thead>
          {tasks.map((task) => (
            <tbody key={task._id}>
              {/* row 1 */}
              <tr>
                <td className="text-black">{task.title}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodoList;
