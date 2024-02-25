import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/Account.module.css";

const Edit = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { token, tasks } = useSelector((store) => store);
  const formattedDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(`${process.env.REACT_APP_API}/task/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...values, token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (data?.error) {
        toast.error(`${data.error}`);
        setIsLoading(false);
        return;
      }
      setValues({ name: "", description: "", date: "" });
      toast.success(`Task ${values.name} edited Successfully`);
    } catch (error) {
      console.log("EDIT ERROR", error);
      toast.error(`Something went wrong`);
    }
    setIsLoading(false);
  };
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      task.data = formattedDate(task.data);
      setValues(task);
    }
  }, []);
  return (
    <div className={style["create-task-wrapper"]}>
      <ToastContainer />
      <div className={style.header}>
        <h1>Edit Task</h1>
      </div>
      <form onSubmit={handleEdit} className={style["form-container"]}>
        <div className={style["form-group"]}>
          <label htmlFor="name" className={style["form-label"]}>
            Task Name
          </label>
          <input
            type="text"
            id="name"
            className={style["form-input"]}
            placeholder="Enter task name"
            value={values.name}
            name="name"
            required
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className={style["form-group"]}>
          <label htmlFor="name" className={style["form-label"]}>
            Task Description
          </label>
          <textarea
            type="textarea"
            id="textarea"
            className={style["form-input"]}
            placeholder="Enter task details"
            value={values.description}
            name="description"
            required
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className={style["form-group"]}>
          <label htmlFor="date" className={style["form-label"]}>
            Select a date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formattedDate(values.date)}
            onChange={handleChange}
            min={today}
            className={style["form-input"]}
            // required
          />
        </div>
        <div className={style["form-group"]}>
          <label htmlFor="date" className={style["form-label"]}>
            Select the status
          </label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleChange}
            className={style["form-input"]}
            // required
          >
            <option value={"pending"}>Pending</option>
            <option value={"processing"}>Processing</option>
            <option value={"completed"}>Completed</option>
          </select>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={style["form-button"]}
        >
          {isLoading ? "Wait..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Edit;
