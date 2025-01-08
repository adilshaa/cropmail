// client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }) => {
	const token = Cookies.get("token");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Component {...rest} />;
};

export default PrivateRoute;
