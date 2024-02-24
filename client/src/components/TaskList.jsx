import React, { useState, useEffect, useRef, useMemo } from "react";
import style from "../assets/styles/TaskList.module.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserList = () => {
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
    } catch (error) {
      console.log("ACCOUNT ERROR", error);
      toast.error(`Something went wrong`);
    }
    setLoading(false);
  };
  const handleChange = (e) => {
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

      <table className={style["table"]}>
        <thead className={style["thead"]}>
          <tr className={style["tr"]}>
            <th scope="col" className={style["th"]}>
              Name
            </th>
            <th scope="col" className={style["th"]}>
              Position
            </th>
            <th scope="col" className={style["th"]}>
              Status
            </th>
            <th scope="col" className={style["th"]}>
              Edit
            </th>
            <th scope="col" className={style["th"]}>
              Delete
            </th>
          </tr>
        </thead>
        <tbody className={style["tbody"]}>
          {tasks?.tasks?.map((task, index) => {
            return (
              <tr key={task?.id} className={style["tr"]}>
                <td className={style["td"]}>{task?.name}</td>
                <td className={style["td"]}>{task?.description}</td>
                <td className={style["td"]}>{task?.status}</td>
                <td className={style["td"]}>
                  <Link className={`${style["action-link"]} ${style["edit"]}`}>
                    Edit
                  </Link>
                </td>
                <td className={style["td"]}>
                  <button
                    disabled={task.createdBy !== user._id}
                    className={style["action-link"]}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className={style["table-navigation"]} aria-label="Table navigation">
        <span className={style["pagination-info"]}>
          Showing{" "}
          <span className={style["highlight"]}>
            {filters.page}-{filters.page * filters.limit}
          </span>{" "}
          of <span className="highlight">{tasks?.totalTasks}</span>
        </span>
        <ul className={style["pagination"]}>
          <li>
            <button className={style["pagination-link"]}>Previous</button>
          </li>
          <li>
            <button className={style["pagination-link"]}>1</button>
          </li>
          <li>
            <button className={style["pagination-link"]}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
