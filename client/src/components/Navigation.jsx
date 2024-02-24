import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/Navigation.module.css";
import { LOGOUT, logout } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleLogout = () => {
    toast.success(`Logout successful ${user.name}`);
    setTimeout(() => {
      logout(dispatch);
    }, 2000);
  };
  return (
    <div className={style.sidebar}>
      <ToastContainer />
      <div className={style.profile}>
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className={style["profile-image"]}
        />
        <div>
          <h2>{user.name}</h2>
          <p className={style["profile-link"]}>{user.email}</p>
        </div>
      </div>
      <div className={style.menu}>
        <ul className={style["menu-list"]}>
          <li>
            <NavLink to="/" className={style["menu-item"]}>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={style["menu-item"]}>
              <span>Add</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={style.actions}>
        <button onClick={handleLogout} className={style["logout-btn"]}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
