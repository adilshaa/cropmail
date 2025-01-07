// client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
