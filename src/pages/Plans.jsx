import React, { useState, useRef } from "react";
import { 
    FaCheck, FaTimes, FaSun, FaMoon,
    FaTwitter, FaFacebook, FaLinkedin, FaInstagram
} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Plans = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const navigate = useNavigate();

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const handleSelectPlan = (planId) => {
        // Check if user is logged in by looking for token or user data
        const isLoggedIn = localStorage.getItem('token'); // or however you check authentication
        
        if (isLoggedIn) {
            navigate(`/home/pay?plan=${planId}`);
        } else {
            navigate('/login', { state: { redirectTo: `/home/pay?plan=${planId}` } });
        }
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
                { name: "Custom Domain", included: false },
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
                { name: "Custom Domain", included: true },
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
                { name: "Multiple Domains", included: true },
            ],
        }
    ];

    return (
        <div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
            {/* Navbar */}
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

            {/* Hero Section */}
            <div className="pt-28 pb-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Choose the Perfect Plan for Your Business
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Start with a 14-day free trial. No credit card required.
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative ${
                                plan.name === "Professional" ? "transform md:-translate-y-4" : ""
                            } rounded-2xl shadow-lg ${
                                isDarkTheme ? "bg-gray-800" : "bg-white"
                            } transition-all duration-300 hover:shadow-xl`}
                        >
                            {plan.name === "Professional" && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-gray-500 mb-6">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-500">/{plan.period}</span>
                                </div>
                                <button
                                    onClick={() => handleSelectPlan(plan.id)}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                                        plan.name === "Professional"
                                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                                            : "border border-blue-500 text-blue-500 hover:bg-blue-50"
                                    }`}
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
            </div>

            {/* Footer */}
            <footer className={`${isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'} py-12`}>
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
