import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default ProtectedRoute;
