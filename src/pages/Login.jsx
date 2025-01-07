import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Add Link import here
import "./styles.css";
import { post } from "../services/apiService";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { FaSun, FaMoon, FaGoogle, FaMicrosoft } from "react-icons/fa";
import msalInstance from "../msalConfig";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/home/sent";

	const validateEmail = (email) => {
		const emailRegex = /\S+@\S+\.\S+/;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumbers = /\d/.test(password);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (password.length < minLength) {
			setPasswordError("Password must be at least 8 characters long");
			return false;
		}
		if (!hasUpperCase) {
			setPasswordError("Password must contain at least one uppercase letter");
			return false;
		}
		if (!hasLowerCase) {
			setPasswordError("Password must contain at least one lowercase letter");
			return false;
		}
		if (!hasNumbers) {
			setPasswordError("Password must contain at least one number");
			return false;
		}
		if (!hasSpecialChar) {
			setPasswordError("Password must contain at least one special character");
			return false;
		}
		setPasswordError("");
		return true;
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setEmail(value);
		if (!validateEmail(value)) {
			setEmailError("Please enter a valid email address.");
		} else {
			setEmailError("");
		}
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		validatePassword(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// Clear previous errors
		setEmailError("");
		setPasswordError("");
		
		// Validate both fields before proceeding
		if (!email) {
			setEmailError("Email is required");
			return;
		}
		
		if (!password) {
			setPasswordError("Password is required");
			return;
		}

		// Validate email format
		if (!validateEmail(email)) {
			setEmailError("Please enter a valid email address");
			return;
		}

		// Validate password requirements
		if (!validatePassword(password)) {
			return; // validatePassword already sets the error message
		}

		try {
			const response = await post("/login", { email, password }, false);
			if (response && response.token) {
				localStorage.setItem('token', response.token);
				navigate(from, { replace: true });
			} else {
				setEmailError("Invalid response from server");
			}
		} catch (error) {
			console.error("Login failed:", error);
			setEmailError("Invalid email or password.");
		}
	};

	const onGoogleSuccess = (credentialResponse) => {
		console.log("Google Login Success:", credentialResponse);
		localStorage.setItem("token", credentialResponse.credential);
		navigate(from, { replace: true });
	};

	const onGoogleFailure = () => {
		console.log("Google Login Failed");
		setEmailError("Google login failed. Please try again.");
	};

	const handleMicrosoftLogin = async () => {
		try {
			const loginResponse = await msalInstance.loginPopup({
				scopes: ["user.read"],
			});
			localStorage.setItem("token", loginResponse.accessToken);
			navigate(from, { replace: true });
		} catch (error) {
			console.error("Microsoft Login Failed:", error);
			setEmailError("Microsoft login failed. Please try again.");
		}
	};

	return (
		<div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
			{/* Header with Glass Effect */}
			<nav
				className={`fixed w-full backdrop-blur-md bg-opacity-70 ${
					isDarkTheme ? "bg-gray-900/70" : "bg-white/70"
				} z-50 px-5 sm:px-20 py-4`}
			>
				<div className="flex justify-between items-center">
					<h1
						className={`text-2xl font-bold bg-gradient-to-r ${
							isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
						} bg-clip-text text-transparent`}
					>
						Cropmail
					</h1>
					<button
						onClick={() => setIsDarkTheme(!isDarkTheme)}
						className={`ml-4 px-4 py-2 rounded flex items-center ${
							isDarkTheme ? "text-yellow-500" : "text-gray-800"
						}`}
					>
						{isDarkTheme ? <FaSun className="w-5 h-5 rotate" /> : <FaMoon className="w-5 h-5 float" />}
					</button>
				</div>
			</nav>

			{/* Login Form Section */}
			<div className="relative pt-24 pb-32">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>
				<div className="relative z-10 max-w-md mx-auto px-4">
					<div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-8 shadow-xl`}>
						<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
							Welcome Back
						</h2>

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
									Email
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
										emailError ? "border-red-500" : ""
									}`}
									placeholder="Enter your email"
								/>
								{emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
									Password
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										value={password}
										onChange={handlePasswordChange}
										className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
											passwordError ? "border-red-500" : ""
										}`}
										placeholder="Enter your password"
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
									>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>
								{passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
							</div>
							<div className="flex items-center justify-between">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>
									Sign In
								</button>
								<a
									href="#"
									className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
								>
									Forgot Password?
								</a>
							</div>
						</form>

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div
										className={`w-full border-t ${
											isDarkTheme ? "border-gray-700" : "border-gray-300"
										}`}
									></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span
										className={`px-2 ${isDarkTheme ? "bg-gray-800" : "bg-white"} ${
											isDarkTheme ? "text-gray-400" : "text-gray-500"
										}`}
									>
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="w-full">
									<GoogleLogin
										onSuccess={onGoogleSuccess}
										onError={onGoogleFailure}
										size="large"
										theme={isDarkTheme ? "filled_black" : "outline"}
									/>
								</div>
								<button
									onClick={handleMicrosoftLogin}
									className={`flex items-center justify-center px-4 py-2 border ${
										isDarkTheme
											? "border-gray-700 hover:bg-gray-700"
											: "border-gray-300 hover:bg-gray-50"
									} rounded-lg transition-colors`}
								>
									<FaMicrosoft className="mr-2" />
									Microsoft
								</button>
							</div>
						</div>

						<p className="mt-8 text-center text-sm text-gray-500">
							Don't have an account?{" "}
							<Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
