import React, { useState, useRef } from "react";
import { FaMailBulk, FaSun, FaMoon, FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import Accordion from "../components/Accordion";
import "./LandingPage.css";
import { FaCheck } from "react-icons/fa";
import DetailedMenu from "../components/DetailedMenu";

const LandingPage = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState(null);
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

    return (
        <div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} overflow-hidden`}>
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
                        <a
                            href="#price"
                            ref={menuRefs.Price}
                            className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
                            onMouseEnter={() => handleMouseEnter("Price")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Price
                        </a>
                        <a
                            href="#about"
                            ref={menuRefs.About}
                            className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
                            onMouseEnter={() => handleMouseEnter("About")}
                            onMouseLeave={handleMouseLeave}
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            ref={menuRefs.Contact}
                            className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
                            onMouseEnter={() => handleMouseEnter("Contact")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Contact
                        </a>
                        <button className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} font-bold hover:underline`}>
                            Sign Up
                        </button>
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

            {/* Modern Hero Section */}
            <main className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-4">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-gradient-xy"></div>
                
                {/* Glass Card Effect */}
                <div className="relative backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Your Gateway to Modern Email
                    </h2>
                    <p className={`text-lg md:text-xl ${
                        isDarkTheme ? "text-gray-300" : "text-gray-700"
                    } mb-8 leading-relaxed`}>
                        Experience the future of email communication with our powerful and intuitive platform.
                    </p>
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                        Get Started
                        <FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
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
                    <h3 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                    }`}>
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
                    <h3 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                    }`}>
                        Simple, transparent <span className="text-blue-500">pricing</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
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
                        ].map((plan, index) => (
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

            <footer
                className={`${
                    isDarkTheme ? "bg-gray-800 text-gray-400" : "bg-white text-gray-600"
                } shadow w-full py-4 z-10`}
            >
                <div className="max-w-7xl mx-auto text-center">&copy; 2023 Email Sender Pro. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default LandingPage;