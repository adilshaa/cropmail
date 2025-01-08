// client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
	const location = useLocation();
	const isAuthenticated = !!Cookies.get('token');

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return <Component {...rest} />;
};

export default PrivateRoute;
