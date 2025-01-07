// client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
	const { isAuthenticated, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
