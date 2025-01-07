import React, { useState, useRef } from "react";
import { 
    FaCheck, 
    FaTimes, 
    FaSun, 
    FaMoon,
    FaTwitter, 
    FaFacebook, 
    FaLinkedin, 
    FaInstagram,
    FaBars
} from "react-icons/fa";
import { Link } from 'react-router-dom';

const Plans = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const menuRefs = {
        Home: useRef(null),
        About: useRef(null),
        Contact: useRef(null),
    };

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
            {/* Modern Navbar with Glass Effect */}
            <nav className={`fixed w-full backdrop-blur-md bg-opacity-70 ${
                isDarkTheme ? "bg-gray-900/70" : "bg-white/70"
            } z-50 px-5 sm:px-20 py-4`}>
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
                        <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                            isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
                        } bg-clip-text text-transparent`}>
                            Cropmail
                        </h1>
                    </div>

                    <div className="hidden sm:flex space-x-8">
                        <Link to="/" className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}>
                            Home
                        </Link>
                        <Link to="/about" className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}>
                            About
                        </Link>
                        <Link to="/contact" className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}>
                            Contact
                        </Link>
                        <Link to="/login" className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} font-bold hover:underline`}>
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

            {/* Hero Section with Pricing Focus */}
            <main className="min-h-[20vh] flex flex-col items-center justify-center relative px-5 sm:px-4 pt-20 pb-8">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Choose Your Perfect Plan
                    </h2>
                    <p className={`text-base md:text-lg ${isDarkTheme ? "text-gray-300" : "text-gray-700"} mb-4`}>
                        Scale your email marketing with our flexible pricing options
                    </p>
                </div>
            </main>

            {/* Pricing Cards Section - Adjusted top padding */}
            <section className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
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

            {/* Enhanced Footer */}
            <footer className={`${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} pt-20 pb-10`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="text-lg font-bold mb-4">About Cropmail</h4>
                            <p className="text-gray-600 mb-4">Revolutionizing email marketing with AI-powered solutions for businesses of all sizes.</p>
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
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Features</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Pricing</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">API</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-blue-500">Documentation</a></li>
                            </ul>
                        </div>
                        {/* ...remaining footer columns... */}
                    </div>
                    <div className="border-t border-gray-300 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-600 text-sm">&copy; 2023 Cropmail. All rights reserved.</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="/privacy-policy" className="text-gray-600 hover:text-blue-500 text-sm">Privacy Policy</a>
                                <a href="/terms-and-conditions" className="text-gray-600 hover:text-blue-500 text-sm">Terms of Service</a>
                                <a href="/cookie-policy" className="text-gray-600 hover:text-blue-500 text-sm">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Plans;
