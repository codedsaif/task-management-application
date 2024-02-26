import React, { useEffect, useState } from "react";
import style from "../assets/styles/Account.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { accountSetup } from "../redux/action";

const initialState = {
  name: "",
  email: "saifali27906@gmail.com",
  password: "secret",
  isMember: true,
};

const Account = () => {
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMember = () => {
    setValues((prev) => ({
      ...prev,
      isMember: !prev.isMember,
    }));
  };
  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const userHandle = async (endPoint, currentUser) => {
    setIsLoading(true);
    try {
      let res = await fetch(`${process.env.REACT_APP_API}/auth/${endPoint}`, {
        method: "POST",
        body: JSON.stringify(currentUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (data?.error) {
        toast.error(
          `${data.error}${values.isMember ? values.email : values.name}`
        );
        setIsLoading(false);
        return;
      }
      toast.success(
        `${endPoint} successful  ${
          values.isMember ? values.email : values.name
        }`
      );
      accountSetup(data, dispatch);
    } catch (error) {
      console.log("ACCOUNT ERROR", error);
      toast.error(`Something went wrong`);
    }
    setIsLoading(false);
  };
  const onSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error(`Please provide all values`);
      return;
    }
    if (password.length < 6) toast.error(`Password is too short`);

    const currentUser = { name, email, password };
    let endPoint = isMember ? "signin" : "signup";
    userHandle(endPoint, currentUser);
  };

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <form className={style["form-container"]} onSubmit={onSubmit}>
        <div className={style.header}>
          <h1>{values.isMember ? "Login" : "Register"}</h1>
        </div>
        {!values.isMember && (
          <div className={style["form-group"]}>
            <label htmlFor="name" className={style["form-label"]}>
              Your name
            </label>
            <input
              type="text"
              id="name"
              className={style["form-input"]}
              placeholder="Enter you name"
              value={values.name}
              name="name"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        )}
        <div className={style["form-group"]}>
          <label htmlFor="email" className={style["form-label"]}>
            Your email
          </label>
          <input
            type="email"
            id="email"
            className={style["form-input"]}
            placeholder="example@developersdrills.com"
            value={values.email}
            name="email"
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className={style["form-group"]}>
          <label htmlFor="password" className={style["form-label"]}>
            Your password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className={style["form-input"]}
            onChange={handleChange}
            value={values.password}
            disabled={isLoading}
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className={style["form-button"]}
        >
          {isLoading ? "Wait..." : "Submit"}
        </button>
        <p className={style.toggle}>
          {values.isMember ? "Not a member yet? " : "Already a member? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </>
  );
};

export default Account;
