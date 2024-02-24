import React from "react";
import style from "../assets/styles/Account.module.css";

const NavigationForm = () => {
  return (
    <form className={style["form-container"]}>
      <div className={style.header}>
        <h1>Welcome!</h1>
      </div>
      <div className={style["form-group"]}>
        <label htmlFor="name" className={style["form-label"]}>
          Your name
        </label>
        <input
          type="name"
          id="name"
          className={style["form-input"]}
          placeholder="Enter you name"
          required
        />
      </div>
      <div className={style["form-group"]}>
        <label htmlFor="email" className={style["form-label"]}>
          Your email
        </label>
        <input
          type="email"
          id="email"
          className={style["form-input"]}
          placeholder="example@developersdrills.com"
          required
        />
      </div>
      <div className={style["form-group"]}>
        <label htmlFor="password" className={style["form-label"]}>
          Your password
        </label>
        <input
          type="password"
          id="password"
          className={style["form-input"]}
          required
        />
      </div>
      <button type="submit" className={style["form-button"]}>
        Submit
      </button>
    </form>
  );
};

export default NavigationForm;
