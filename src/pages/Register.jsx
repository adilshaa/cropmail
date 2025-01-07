import React, { useState } from "react";
import { FaSun, FaMoon, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import msalInstance from "../msalConfig";

const Register = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your registration logic here
	};

	const handleGoogleSuccess = (credentialResponse) => {
		console.log(credentialResponse);
		// Handle Google registration
	};

	const handleMicrosoftLogin = async () => {
		try {
			const loginResponse = await msalInstance.loginPopup({
				scopes: ["user.read"],
			});
			console.log("Microsoft Login Success:", loginResponse);
			Cookies.set("token", loginResponse.accessToken, { expires: 7 });
			window.location.href = "/dashboard";
		} catch (error) {
			console.error("Microsoft Login Failed:", error);
			setErrors({ microsoft: "Microsoft login failed. Please try again." });
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

			{/* Register Form Section */}
			<div className="relative pt-24 pb-32">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>
				<div className="relative z-10 max-w-md mx-auto px-4">
					<div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-8 shadow-xl`}>
						<h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
							Create Account
						</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
									Full Name
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className={`w-full px-4 py-2 rounded-lg border ${
										isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
									}`}
									required
								/>
							</div>

							<div>
								<label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`w-full px-4 py-2 rounded-lg border ${
										isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
									}`}
									required
								/>
							</div>

							<div>
								<label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
									Password
								</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className={`w-full px-4 py-2 rounded-lg border ${
										isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
									}`}
									required
								/>
							</div>

							<div>
								<label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
									Confirm Password
								</label>
								<input
									type="password"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									className={`w-full px-4 py-2 rounded-lg border ${
										isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
									}`}
									required
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
							>
								Register
							</button>
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
										onSuccess={handleGoogleSuccess}
										onError={() => console.log("Login Failed")}
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
							Already have an account?{" "}
							<Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
