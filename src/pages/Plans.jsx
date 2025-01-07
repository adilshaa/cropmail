import React, { useState } from "react";
import { FaCheck, FaTimes, FaSun, FaMoon } from "react-icons/fa";

const Plans = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	const plans = [
		{
			name: "Free",
			price: "$0",
			period: "year",
			description: "Basic features for personal use.",
			features: [
				{ name: "Basic Support", included: true },
				{ name: "Limited Access", included: true },
				{ name: "Community Access", included: false },
			],
		},
		{
			name: "Professional",
			price: "$49",
			period: "year",
			description: "Advanced features for professionals.",
			features: [
				{ name: "Priority Support", included: true },
				{ name: "Full Access", included: true },
				{ name: "Community Access", included: true },
			],
		},
		{
			name: "Organizations",
			price: "$99",
			period: "year",
			description: "Comprehensive for organizations.",
			features: [
				{ name: "Dedicated Support", included: true },
				{ name: "Unlimited Access", included: true },
				{ name: "Community Access", included: true },
			],
		},
	];

	return (
		<div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
			<div className="w-full flex justify-between items-center px-5 sm:px-20 py-4">
				<h1 className="text-2xl font-bold">Pricing Plans</h1>
				<button
					onClick={toggleTheme}
					className={`ml-4 px-4 py-2 rounded flex items-center ${
						isDarkTheme ? "text-yellow-500" : "text-gray-800"
					}`}
				>
					{isDarkTheme ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
				</button>
			</div>
			<section className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6">
				<h3
					className={`text-xl sm:text-2xl font-bold ${
						isDarkTheme ? "text-yellow-500" : "text-gray-600"
					} mb-4 text-center`}
				>
					Our Pricing Plans
				</h3>
				<p className={`text-sm sm:text-md ${isDarkTheme ? "text-gray-400" : "text-gray-400"} mb-8 text-center`}>
					Choose the plan that best suits your needs and start enjoying our services.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`${
								isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
							} border rounded-lg flex flex-col text-left hover:shadow-lg transition-shadow duration-300`}
						>
							<div className="p-6 sm:p-8 flex-grow">
								<h4 className="text-[18px] sm:text-[20px] font-semibold mb-2">{plan.name}</h4>
								<p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-4`}>
									{plan.description}
								</p>
								<p className="text-3xl sm:text-4xl font-bold mb-1">{plan.price}</p>
								<p className="text-xs sm:text-sm text-gray-500 mb-4">{plan.period}</p>
								{plan.name === "Free" && (
									<button className="bg-transparent text-yellow-500 border border-gray-600 hover:border-yellow-500 py-2 px-4 rounded mb-2 hover:bg-yellow-500 hover:text-white transition-colors">
										Try Free
									</button>
								)}
								{plan.name !== "Free" && (
									<button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
										Subscribe Now
									</button>
								)}
							</div>
							<div className={`${isDarkTheme ? "bg-gray-800" : "bg-gray-50"} flex-grow`}>
								<h5
									className={`font-normal ${
										isDarkTheme ? "text-gray-400" : "text-gray-500"
									} px-4 py-2`}
								>
									Features
								</h5>
								<ul className="px-4 pb-4">
									{plan.features.map((feature, idx) => (
										<li key={idx} className="flex items-center mb-1">
											{feature.included ? (
												<FaCheck
													className={`${
														isDarkTheme ? "text-yellow-400" : "text-yellow-500"
													} mr-2`}
												/>
											) : (
												<FaTimes
													className={`${
														isDarkTheme ? "text-gray-500" : "text-gray-400"
													} mr-2`}
												/>
											)}
											<span className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
												{feature.name}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Plans;
