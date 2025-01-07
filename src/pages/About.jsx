import React, { useState } from "react";
import { FaSun, FaMoon, FaRocket, FaUsers, FaLightbulb, FaChartLine } from "react-icons/fa";

const About = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const teamMembers = [
        {
            name: "John Smith",
            role: "CEO & Founder",
            image: "https://via.placeholder.com/150",
            description: "Visionary leader with 15+ years in email marketing"
        },
        {
            name: "Sarah Johnson",
            role: "Head of Product",
            image: "https://via.placeholder.com/150",
            description: "Product strategist focused on user experience"
        },
        {
            name: "Mike Chen",
            role: "Tech Lead",
            image: "https://via.placeholder.com/150",
            description: "Engineering expert in email infrastructure"
        }
    ];

    return (
        <div className={`${isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
            {/* Header with Glass Effect */}
            <nav className={`fixed w-full backdrop-blur-md bg-opacity-70 ${
                isDarkTheme ? "bg-gray-900/70" : "bg-white/70"
            } z-50 px-5 sm:px-20 py-4`}>
                <div className="flex justify-between items-center">
                    <h1 className={`text-2xl font-bold bg-gradient-to-r ${
                        isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-600"
                    } bg-clip-text text-transparent`}>
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

            {/* Hero Section */}
            <div className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Our Story
                        </h1>
                        <p className={`text-xl ${isDarkTheme ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
                            Revolutionizing email marketing through innovative solutions and cutting-edge technology.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className={`text-3xl font-bold mb-6 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                Our Mission
                            </h2>
                            <p className={`text-lg mb-6 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                                To empower businesses with intelligent email marketing solutions that drive growth and foster meaningful connections with their audience.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { icon: <FaRocket className="text-blue-500" />, text: "Drive Innovation" },
                                    { icon: <FaUsers className="text-green-500" />, text: "Build Communities" },
                                    { icon: <FaLightbulb className="text-yellow-500" />, text: "Inspire Growth" },
                                    { icon: <FaChartLine className="text-purple-500" />, text: "Deliver Results" }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        {item.icon}
                                        <span className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`${isDarkTheme ? "bg-gray-800" : "bg-gray-100"} rounded-lg p-8`}>
                            <img 
                                src="https://via.placeholder.com/600x400" 
                                alt="Mission" 
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className={`py-20 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                        Meet Our Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={index} 
                                className={`${isDarkTheme ? "bg-gray-900" : "bg-white"} rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                            >
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <h3 className={`text-xl font-bold text-center mb-2 ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                    {member.name}
                                </h3>
                                <p className="text-blue-500 text-center mb-4">{member.role}</p>
                                <p className={`text-center ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
