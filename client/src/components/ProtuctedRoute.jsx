import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((store) => store.token);
  if (!token) {
    return <Navigate to="/account" />;
  }
  return children;
};

export default ProtectedRoute;
