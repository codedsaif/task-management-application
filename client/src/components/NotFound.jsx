import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/styles/NotFound.module.css";

const Error = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);
  useEffect(() => {
    const countTimerId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 0) {
          clearInterval(countTimerId);
          navigate("/");
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countTimerId);
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={styles.icon}
        >
          {/* SVG Path */}
        </svg>
        <div className={styles.text}>
          <span>404:</span>
          <p>Page Not Found.</p>
          <p>
            Don't worry, you will be redirected to the homepage in {countDown}{" "}
            seconds.
          </p>
        </div>
        <Link to="/" className={styles.button}>
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default Error;
