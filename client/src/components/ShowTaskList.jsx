import React, { useMemo } from "react";
import style from "../assets/styles/TaskList.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { tasksAction } from "../redux/action";

const ShowTaskList = ({
  page = 1,
  limit = 5,
  totalTasks = null,
  numOfPages = 0,
  handlePagination,
  filters,
}) => {
  const dispatch = useDispatch();
  let { user, tasks, token, socket } = useSelector(
    useMemo(
      () => (store) => ({
        user: store.user,
        tasks: store.tasks,
        token: store.token,
        socket: store.socket,
      }),
      []
    )
  );
  const handleDelete = async (id) => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API}/task/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (data?.error) {
        toast.error(`${data.error}`);
        return;
      }
      socket.emit("database-update");
      tasks = tasks.filter((task) => task._id !== id);
      tasksAction(tasks, dispatch);
      toast.success(`Delete Successful`);
    } catch (error) {
      console.log("ACCOUNT ERROR", error);
      toast.error(`Something went wrong`);
    }
  };
  return (
    <>
      <table className={style["table"]}>
        <thead className={style["thead"]}>
          <tr className={style["tr"]}>
            <th scope="col" className={style["th"]}>
              Name
            </th>
            <th scope="col" className={style["th"]}>
              Description
            </th>
            <th scope="col" className={style["th"]}>
              Status
            </th>
            <th scope="col" className={style["th"]}>
              Date
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
          {tasks?.map((task, index) => {
            const formattedDate = new Date(task?.date).toLocaleDateString();
            return (
              <tr key={task?._id} className={style["tr"]}>
                <td className={style["td"]}>{task?.name}</td>
                <td className={style["td"]}>{task?.description}</td>
                <td className={style["td"]}>{task?.status}</td>
                <td className={style["td"]}>{formattedDate}</td>
                <td className={style["td"]}>
                  <Link
                    disabled={task.createdBy !== user.id}
                    className={`${style["action-link"]} ${style["edit"]} ${
                      task.createdBy !== user._id ? style["disabled"] : ""
                    }`}
                    to={task.createdBy === user._id ? `/edit/${task._id}` : ""}
                  >
                    Edit
                  </Link>
                </td>
                <td className={style["td"]}>
                  <button
                    onClick={() => handleDelete(task._id)}
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
            {(page - 1) * limit + 1}-{Math.min(page * limit, totalTasks)}
          </span>{" "}
          of <span className="highlight">{totalTasks}</span>
        </span>
        <ul className={style["pagination"]}>
          <li>
            <button
              disabled={page <= 1}
              className={`${style["pagination-link"]} ${
                page <= 1 ? style["disabled"] : ""
              }`}
              name="page"
              value={page - 1}
              onClick={() => handlePagination({ ...filters, page: page - 1 })}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: numOfPages }, (item, index) => {
            return index + 1;
          }).map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <button
                  name="page"
                  value={pageNumber}
                  onClick={() =>
                    handlePagination({ ...filters, page: pageNumber })
                  }
                  key={pageNumber}
                  className={`${style["pagination-link"]} ${
                    page === pageNumber ? style["disabled"] : ""
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li>
            <button
              name="page"
              value={page + 1}
              onClick={() => handlePagination({ ...filters, page: page + 1 })}
              className={`${style["pagination-link"]} ${
                page === numOfPages ? style["disabled"] : ""
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default ShowTaskList;
