import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate,  } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    if (!loading && isAuthenticated === false) {
        return <Navigate to='/loginsignup' />
    }

    if (loading && isAdmin === true && user.role !== 'admin') {
        return <Navigate to='/loginsignup' />
    }

    return <Fragment>{loading === false ? children : null}</Fragment>
}

export default ProtectedRoute;