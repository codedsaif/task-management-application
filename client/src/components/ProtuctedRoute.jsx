import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (true) {
    return <Navigate to="/account" />;
  }
  return children;
};

export default ProtectedRoute;
