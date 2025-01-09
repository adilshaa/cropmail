import React, { useState, useRef } from "react";
import {
	FaMailBulk,
	FaSun,
	FaMoon,
	FaBars,
	FaTimes,
	FaArrowRight,
	FaUser,
	FaCheck,
	FaChartLine,
	FaUsers,
	FaGlobe,
	FaClock,
	FaSlack,
	FaShopify,
	FaWordpress,
	FaHubspot,
	FaMailchimp,
	FaTwitter,
	FaFacebook,
	FaLinkedin,
	FaInstagram,
} from "react-icons/fa";
import Accordion from "../components/Accordion";
import "./LandingPage.css";
import DetailedMenu from "../components/DetailedMenu";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import IntegrationParnters from "../components/IntegrationsPartners";

const LandingPage = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const [hoveredMenu, setHoveredMenu] = useState(null);
	const navigate = useNavigate();

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
	const [menuWidth, setMenuWidth] = useState(0);

	const menuRefs = {
		Price: useRef(null),
		About: useRef(null),
		Contact: useRef(null),
	};

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	const handleMouseEnter = (menu) => {
		setHoveredMenu(menu);
		const rect = menuRefs[menu].current.getBoundingClientRect();
		setMenuPosition({ top: rect.bottom, left: rect.left });
		setMenuWidth(rect.width);
	};

	const handleMouseLeave = () => {
		setHoveredMenu(null);
	};

	const handleSelectPlan = (planId) => {
		navigate(`/home/pay?plan=${planId}`);
	};

	const plans = [
		{
			id: 1,
			name: "Basic",
			price: "$9.99",
			period: "month",
			description: "Perfect for starters",
			features: [
				{ name: "1,000 Email Credits", included: true },
				{ name: "Basic Templates", included: true },
				{ name: "Email Support", included: true },
				{ name: "Analytics Dashboard", included: false },
			],
		},
		{
			id: 2,
			name: "Professional",
			price: "$19.99",
			period: "month",
			description: "Most popular choice",
			features: [
				{ name: "10,000 Email Credits", included: true },
				{ name: "Premium Templates", included: true },
				{ name: "Priority Support", included: true },
				{ name: "Advanced Analytics", included: true },
			],
		},
		{
			id: 3,
			name: "Enterprise",
			price: "$49.99",
			period: "month",
			description: "For large organizations",
			features: [
				{ name: "Unlimited Email Credits", included: true },
				{ name: "Custom Templates", included: true },
				{ name: "24/7 Support", included: true },
				{ name: "Advanced Analytics", included: true },
			],
		},
	];

	// Fix Stats Section
	const StatsSection = () => (
		<section className={`py-20 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="text-center">
						<h4 className="text-4xl font-bold text-blue-500">10M+</h4>
						<p className="text-gray-600">Emails Sent Daily</p>
					</div>
					<div className="text-center">
						<h4 className="text-4xl font-bold text-blue-500">98%</h4>
						<p className="text-gray-600">Delivery Rate</p>
					</div>
					<div className="text-center">
						<h4 className="text-4xl font-bold text-blue-500">50k+</h4>
						<p className="text-gray-600">Happy Users</p>
					</div>
					<div className="text-center">
						<h4 className="text-4xl font-bold text-blue-500">24/7</h4>
						<p className="text-gray-600">Expert Support</p>
					</div>
				</div>
			</div>
		</section>
	);

	// Fix Pricing Cards Section
	const PricingCards = () => (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{plans.map((plan) => (
				<div
					key={plan.id}
					className={`${
						isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
					} border rounded-lg flex flex-col text-left hover:shadow-lg transition-shadow duration-300`}
				>
					<div className="p-6 sm:p-8 flex-grow">
						<h4 className="text-[18px] sm:text-[20px] font-semibold mb-2">{plan.name}</h4>
						<p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-4`}>{plan.description}</p>
						<p className="text-3xl sm:text-4xl font-bold mb-1">{plan.price}</p>
						<p className="text-xs sm:text-sm text-gray-500 mb-4">/{plan.period}</p>
						<button
							onClick={() => handleSelectPlan(plan.id)}
							className={`w-full ${
								plan.name === "Professional"
									? "bg-blue-500 hover:bg-blue-600 text-white"
									: "border border-blue-500 text-blue-500 hover:bg-blue-50"
							} py-3 px-4 rounded-lg font-semibold transition-colors`}
						>
							{plan.name === "Professional" ? "Get Started" : "Choose Plan"}
						</button>
						<ul className="mt-8 space-y-4">
							{plan.features.map((feature, idx) => (
								<li key={idx} className="flex items-center">
									{feature.included ? (
										<FaCheck className="text-green-500 mr-3" />
									) : (
										<FaTimes className="text-gray-400 mr-3" />
									)}
									<span className={feature.included ? "text-gray-700" : "text-gray-400"}>
										{feature.name}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<>
			<SEO
				title="Revolutionary Email Marketing Platform"
				description="Transform your email campaigns with AI-powered automation, real-time analytics, and personalized content delivery. Start your free trial today!"
				keywords={[
					"email marketing",
					"AI automation",
					"marketing automation",
					"email campaigns",
					"digital marketing",
				]}
				canonical="https://cropmail.onrender.com"
			/>
			<div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} overflow-hidden`}>
				{/* Modern Navbar with Glass Effect */}

				<Navigation
					handleMouseLeave={handleMouseLeave}
					handleMouseEnter={handleMouseEnter}
					isDarkTheme={isDarkTheme}
					menuRefs={menuRefs}
					toggleTheme={toggleTheme}
					key="navigation"
				></Navigation>

				{/* Enhanced Hero Section */}

				<HeroSection isDarkTheme={isDarkTheme}></HeroSection>
				{/* Modern Features Section */}
				<section className="py-20 relative overflow-hidden">
					<div className="max-w-6xl mx-auto px-4">
						<h3
							className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
								isDarkTheme ? "text-white" : "text-gray-900"
							}`}
						>
							Features that <span className="text-blue-500">empower</span> you
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[...Array(6)].map((_, index) => (
								<div
									key={index}
									className={`${
										isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
									} border rounded-lg p-10 sm:p-12 text-left hover:shadow-lg transition-shadow duration-300 relative overflow-hidden`}
								>
									<div className="absolute inset-0 bg-yellow-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
									<div className="relative z-10">
										<div className="icon mb-4">
											<FaMailBulk className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform duration-300" />
										</div>
										<h4
											className={`text-lg sm:text-xl font-semibold mb-2 ${
												isDarkTheme ? "text-white" : "text-gray-900"
											}`}
										>
											Card Title {index + 1}
										</h4>
										<p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
											This is a brief description of the card content.
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Modern Pricing Section */}
				<section className="py-20 relative">
					<div className="max-w-6xl mx-auto px-4">
						<h3
							className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
								isDarkTheme ? "text-white" : "text-gray-900"
							}`}
						>
							Simple, transparent <span className="text-blue-500">pricing</span>
						</h3>
						<PricingCards />
					</div>
				</section>

				<section className="w-full max-w-2xl mx-auto py-12 relative z-20">
					<h3
						className={`text-3xl font-bold text-center mb-6 ${
							isDarkTheme ? "text-yellow-500" : "text-gray-900"
						}`}
					>
						Frequently Asked Questions
					</h3>
					<Accordion
						title="What is Email Sender Pro?"
						content="Email Sender Pro is a powerful tool that allows you to send emails quickly and efficiently."
						isDarkTheme={isDarkTheme}
					/>
					<Accordion
						title="How do I sign up?"
						content="Click the 'Sign Up' button at the top of the page to create an account."
						isDarkTheme={isDarkTheme}
					/>
					<Accordion
						title="Is there a free trial available?"
						content="Yes, we offer a 14-day free trial for new users."
						isDarkTheme={isDarkTheme}
					/>
					{/* Add more Accordion items as needed */}
				</section>

				{/* Stats Section */}
				<StatsSection />

				{/* Integration Partners */}

				<IntegrationParnters isDarkTheme={isDarkTheme}></IntegrationParnters>

				{/* Pre-footer CTA */}
				<section className={`py-20 ${isDarkTheme ? "bg-gray-800" : "bg-blue-50"}`}>
					<div className="max-w-4xl mx-auto text-center px-4">
						<h3 className="text-3xl font-bold mb-4">Ready to Transform Your Email Marketing?</h3>
						<p className="text-lg mb-8 text-gray-600">
							Join thousands of marketers who have already upgraded their email game
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
								Start Free Trial
							</button>
							<button className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
								Schedule Demo
							</button>
						</div>
					</div>
				</section>
				<Footer isDarkTheme={isDarkTheme}></Footer>
			</div>
		</>
	);
};

export default LandingPage;
