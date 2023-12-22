import moment from "moment/moment";
import React from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddTasks = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);

    const taskItem = {
      title: data.title,
      priority: data.priority,
      descriptions: data.descriptions,
      date: data.date,
    };

    const articleRes = await axiosPublic.post("/addtasks", taskItem);
    console.log(articleRes.data);
    if (articleRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Added Succesfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            type="text"
            placeholder="title"
            className="input input-bordered w-full mb-4"
          />
          <select
            {...register("priority")}
            className="select select-primary w-full mb-4"
          >
            <option disabled selected>
              Select Priority
            </option>
            <option value="low">Low</option>
            <option value="moderate">moderate</option>
            <option value="high">high</option>
          </select>
          <textarea
            {...register("descriptions")}
            placeholder="descriptions"
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>
          <div className="col-span-full">
            <label className="text-sm">Submit Time</label>
            <input {...register("date")} type="date" />
          </div>
          <button type="submit" className="btn bg-gray-800 text-white">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
