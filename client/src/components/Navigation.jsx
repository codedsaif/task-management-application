import React from "react";
import { NavLink } from "react-router-dom";
import style from "../assets/styles/Navigation.module.css";

const Navigation = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.profile}>
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className={style["profile-image"]}
        />
        <div>
          <h2>Leroy Jenkins</h2>
          <p className={style["profile-link"]}>saifali27906@gmail.com</p>
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
        <button className={style["logout-btn"]}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
