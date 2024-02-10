import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      console.log("Yes i am authenticated")
      return <Navigate to="/loginsignup" />;
    }

    if (isAdmin === true && user.role !== "admin") {
      console.log("Yes i am admin");
      return <Navigate to="/loginsignup" />;
    }

    return <Fragment>{children}</Fragment>;
  }

  return null; // Return null while loading is true
};

export default ProtectedRoute;
