import React, { useState, useEffect, useRef, useMemo } from "react";
import style from "../assets/styles/TaskList.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ShowTaskList from "./ShowTaskList";
import { tasksAction } from "../redux/action";

const TaskListFun = () => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  let timeoutId = useRef();
  const [filters, setFilters] = useState({
    search: "",
    sort: "latest",
    scope: "all",
    status: "all",
    page: 1,
    limit: 5,
  });

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const getTasks = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API}/task?search=${filters.search}&sort=${
          filters.sort
        }&scope=${filters.scope}&status=${filters.status}&page=${
          filters.page
        }&limit=${Number(filters.limit)}`,
        {
          method: "GET",
        }
      );
      let data = await res.json();
      console.log(data);
      if (data?.error) {
        toast.error(`${data.error}`);
        setLoading(false);
        return;
      }
      toast.success(
        `showing tasks
        `
      );
      setTasks(data);
      tasksAction(data?.tasks, dispatch);
    } catch (error) {
      console.log("ACCOUNT ERROR", error);
      toast.error(`Something went wrong`);
    }
    setLoading(false);
  };
  const handleChange = (e) => {
    console.log("HandleChangeCalled", e.target.name);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const debounce = () => {
    return (e) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        getTasks();
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), [filters]);
  useEffect(() => {
    optimizedDebounce();
  }, [optimizedDebounce]);
  return (
    <div className={style["container"]}>
      <ToastContainer />
      <div className={style["searchContainer"]}>
        <input
          type="text"
          name="search"
          id="table-search-tasks"
          className={style["searchInput"]}
          placeholder="Search tasks"
          value={filters.search}
          onChange={handleChange}
        />
      </div>
      <div className={style["functionality"]}>
        <div>
          <select
            name="sort"
            className={style["button"]}
            value={filters.sort}
            onChange={handleChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
        <div>
          <select
            className={style["button"]}
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="all">Status</option>
            <option value="process">Process</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <select
            className={style["button"]}
            name="scope"
            value={filters.scope}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value={`${user._id}`}>Your</option>
            <option value={`NOTINCLUDEYES${user._id}`}>Others</option>
          </select>
        </div>
        <div>
          <select
            className={style["button"]}
            name="limit"
            value={filters.limit}
            onChange={handleChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <ShowTaskList
        page={filters.page}
        limit={filters.limit}
        totalTasks={tasks?.totalTasks}
        numOfPages={tasks?.numOfPages}
        filters={filters}
        handlePagination={setFilters}
      />
    </div>
  );
};

export default TaskListFun;
