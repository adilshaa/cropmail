import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = Cookies.get("token");
		setIsAuthenticated(!!token);
		setLoading(false);
	}, []);

	const login = (token) => {
		Cookies.set("token", token, { expires: 7 });
		setIsAuthenticated(true);
	};

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
	};

	return <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
