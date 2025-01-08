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
		<div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} overflow-hidden`}>
			{/* Modern Navbar with Glass Effect */}
			<nav
				className={`fixed w-full backdrop-blur-md bg-opacity-70 ${
					isDarkTheme ? "bg-gray-900/70" : "bg-white/70"
				} z-50 px-5 sm:px-20 py-4`}
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<div className="relative">
							<div className="absolute inset-0 bg-blue-500 blur-lg opacity-20"></div>
							<img
								src="https://shreethemes.in/mortal_next/assets/images/logo-icon-40.png"
								alt="Logo Icon"
								className="w-8 h-8 mr-2 relative z-10"
							/>
						</div>
						<h1
							className={`text-2xl font-bold bg-gradient-to-r ${
								isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
							} bg-clip-text text-transparent`}
						>
							Cropmail
						</h1>
					</div>

					<div className="hidden sm:flex space-x-8">
						<Link
							to="/price"
							ref={menuRefs.Price}
							className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
							onMouseEnter={() => handleMouseEnter("Price")}
							onMouseLeave={handleMouseLeave}
						>
							Price
						</Link>
						<Link
							to="/about"
							ref={menuRefs.About}
							className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
							onMouseEnter={() => handleMouseEnter("About")}
							onMouseLeave={handleMouseLeave}
						>
							About
						</Link>
						<Link
							to="/contact"
							ref={menuRefs.Contact}
							className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
							onMouseEnter={() => handleMouseEnter("Contact")}
							onMouseLeave={handleMouseLeave}
						>
							Contact
						</Link>
						<Link
							to="/login"
							className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} font-bold hover:underline`}
						>
							Sign Up
						</Link>
					</div>

					<button
						onClick={toggleTheme}
						className={`ml-4 px-4 py-2 rounded flex items-center ${
							isDarkTheme ? "text-yellow-500" : "text-gray-800"
						}`}
					>
						{isDarkTheme ? <FaSun className="w-5 h-5 rotate" /> : <FaMoon className="w-5 h-5 float" />}
					</button>
				</div>
			</nav>

			{/* Enhanced Hero Section */}
			<main className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-4">
				{/* Animated Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>

				{/* Enhanced Glass Card Effect */}
				<div className="relative backdrop-blur-lg bg-white/10 p-8 md:p-12 rounded-2xl shadow-xl max-w-5xl mx-auto">
					<div className="absolute -top-4 -left-4 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold transform -rotate-12">
						#1 Email Marketing Solution
					</div>

					<h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
						Revolutionize Your Email Marketing
					</h2>

					<div className="grid md:grid-cols-2 gap-8 mb-8">
						<div>
							<p
								className={`text-lg md:text-xl ${
									isDarkTheme ? "text-gray-300" : "text-gray-700"
								} mb-6 leading-relaxed`}
							>
								Transform your email campaigns with AI-powered automation, real-time analytics, and
								personalized content delivery.
							</p>
							<div className="flex flex-wrap gap-4 mb-6">
								<div className="flex items-center space-x-2">
									<div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
										<span className="text-2xl font-bold text-green-500">5x</span>
									</div>
									<span className="text-sm">Higher Open Rates</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
										<span className="text-2xl font-bold text-blue-500">3x</span>
									</div>
									<span className="text-sm">Better Conversion</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
										<span className="text-2xl font-bold text-purple-500">24/7</span>
									</div>
									<span className="text-sm">Support</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div
								className={`${
									isDarkTheme ? "bg-gray-800/50" : "bg-white/50"
								} p-4 rounded-lg backdrop-blur-sm`}
							>
								<h3 className="font-bold mb-2 flex items-center">
									<FaMailBulk className="text-blue-500 mr-2" /> Smart Automation
								</h3>
								<p className="text-sm opacity-80">
									Automate your email campaigns with AI-driven scheduling and segmentation
								</p>
							</div>
							<div
								className={`${
									isDarkTheme ? "bg-gray-800/50" : "bg-white/50"
								} p-4 rounded-lg backdrop-blur-sm`}
							>
								<h3 className="font-bold mb-2 flex items-center">
									<FaCheck className="text-green-500 mr-2" /> Advanced Analytics
								</h3>
								<p className="text-sm opacity-80">
									Track opens, clicks, and conversions in real-time with detailed insights
								</p>
							</div>
							<div
								className={`${
									isDarkTheme ? "bg-gray-800/50" : "bg-white/50"
								} p-4 rounded-lg backdrop-blur-sm`}
							>
								<h3 className="font-bold mb-2 flex items-center">
									<FaUser className="text-purple-500 mr-2" /> Personalization
								</h3>
								<p className="text-sm opacity-80">
									Deliver personalized content to each subscriber automatically
								</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto">
							Start Free Trial
							<FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
						</button>
						<button
							className={`px-8 py-4 border-2 ${
								isDarkTheme ? "border-gray-700" : "border-gray-300"
							} rounded-full font-bold hover:border-blue-500 transition-colors w-full sm:w-auto`}
						>
							Watch Demo
						</button>
					</div>
				</div>

				{/* Floating Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
					<div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
				</div>
			</main>

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
			<section className="py-20">
				<div className="max-w-6xl mx-auto px-4">
					<h3
						className={`text-2xl font-bold text-center mb-4 ${
							isDarkTheme ? "text-white" : "text-gray-900"
						}`}
					>
						Integrate with Your Favorite Tools
					</h3>
					<p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
						Seamlessly connect with over 100+ popular tools and platforms to streamline your workflow and
						maximize productivity
					</p>

					{/* Featured Integrations */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaShopify className="w-12 h-12 text-[#96bf47] mb-2" />
							<span className="text-sm font-medium">Shopify</span>
							<span className="text-xs text-gray-500">E-commerce</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaWordpress className="w-12 h-12 text-[#21759b] mb-2" />
							<span className="text-sm font-medium">WordPress</span>
							<span className="text-xs text-gray-500">CMS</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaSlack className="w-12 h-12 text-[#4a154b] mb-2" />
							<span className="text-sm font-medium">Slack</span>
							<span className="text-xs text-gray-500">Communication</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaHubspot className="w-12 h-12 text-[#ff7a59] mb-2" />
							<span className="text-sm font-medium">HubSpot</span>
							<span className="text-xs text-gray-500">CRM</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaMailchimp className="w-12 h-12 text-[#ffe01b] mb-2" />
							<span className="text-sm font-medium">Mailchimp</span>
							<span className="text-xs text-gray-500">Marketing</span>
						</div>
					</div>

					{/* Integration Categories */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">E-commerce & Sales</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Shopify Integration
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									WooCommerce Sync
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Payment Gateways
								</li>
							</ul>
						</div>
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">Marketing Tools</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Social Media Platforms
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Analytics Tools
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									CRM Systems
								</li>
							</ul>
						</div>
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">Productivity</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Team Collaboration
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Project Management
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									File Sharing
								</li>
							</ul>
						</div>
					</div>

					{/* CTA */}
					<div className="text-center">
						<button className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
							View All Integrations
						</button>
					</div>
				</div>
			</section>

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

			{/* Enhanced Footer */}
			<footer className={`${isDarkTheme ? "bg-gray-900" : "bg-gray-100"} pt-20 pb-10`}>
				<div className="max-w-6xl mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
						<div>
							<h4 className="text-lg font-bold mb-4">About Cropmail</h4>
							<p className="text-gray-600 mb-4">
								Revolutionizing email marketing with AI-powered solutions for businesses of all sizes.
							</p>
							<div className="flex space-x-4">
								<FaTwitter className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
								<FaFacebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
								<FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
								<FaInstagram className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
							</div>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Product</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Features
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Pricing
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										API
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Documentation
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Resources</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Blog
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Help Center
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Status
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Case Studies
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-bold mb-4">Company</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Careers
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Contact
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-600 hover:text-blue-500">
										Partners
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-300 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-gray-600 text-sm">&copy; 2023 Cropmail. All rights reserved.</p>
							<div className="flex space-x-4 mt-4 md:mt-0">
								<a href="/privacy-policy" className="text-gray-600 hover:text-blue-500 text-sm">
									Privacy Policy
								</a>
								<a href="/terms-and-conditions" className="text-gray-600 hover:text-blue-500 text-sm">
									Terms of Service
								</a>
								<a href="/cookie-policy" className="text-gray-600 hover:text-blue-500 text-sm">
									Cookie Policy
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;
