import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import style from "../assets/styles/Home.module.css"

const Home = () => {
  return (
    <div className={style.Container}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Home;
