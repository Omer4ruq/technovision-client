import React, { useState } from "react";

const OnGoing = () => {
  const [tasks, setTask] = useState([]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Ongoing</th>
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

export default OnGoing;
