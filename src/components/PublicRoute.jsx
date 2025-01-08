import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
	// Check if user is authenticated (you can use your own authentication check)
	const isAuthenticated = localStorage.getItem("token");

	// If authenticated, redirect to home page
	if (isAuthenticated) {
		return <Navigate to="/home/sent" replace />;
	}

	// If not authenticated, render the component
	return <Component />;
};

export default PublicRoute;
