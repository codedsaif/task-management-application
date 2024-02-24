import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import style from "../assets/styles/Account.module.css";

const CreateTask = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((store) => store.token);
  const handleTask = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(`${process.env.REACT_APP_API}/task`, {
        method: "POST",
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
      setTimeout(() => {
        navigate("/");
      }, 3000);
      toast.success(`Task ${values.name} added Successfully`);
    } catch (error) {
      console.log("ACCOUNT ERROR", error);
      toast.error(`Something went wrong`);
    }
    setIsLoading(false);
  };
  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleTask();
  };
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {}, []);
  return (
    <div className={style["create-task-wrapper"]}>
      <ToastContainer />
      <div className={style.header}>
        <h1>Add Task</h1>
      </div>
      <form onSubmit={handleSubmit} className={style["form-container"]}>
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
            value={values.date}
            onChange={handleChange}
            min={today}
            className={style["form-input"]}
            // required
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={style["form-button"]}
        >
          {isLoading ? "Wait..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
