import React, { useState } from "react";
import { FaSun, FaMoon, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const Contact = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

            {/* Contact Section */}
            <div className="relative pt-24 pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-8 shadow-xl`}>
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Get in Touch
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                                        Name
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
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                                        }`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block mb-2 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className={`w-full px-4 py-2 rounded-lg border ${
                                            isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                                        }`}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-6 shadow-xl`}>
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <FaMapMarkerAlt className="text-blue-500 w-5 h-5" />
                                        <span>123 Business Street, New York, NY 10001</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FaPhone className="text-blue-500 w-5 h-5" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FaEnvelope className="text-blue-500 w-5 h-5" />
                                        <span>contact@cropmail.com</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <FaClock className="text-blue-500 w-5 h-5" />
                                        <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            {/* Map or Additional Information */}
                            <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg p-6 shadow-xl`}>
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Our Location
                                </h3>
                                {/* Add a map or additional contact information here */}
                                <div className="aspect-w-16 aspect-h-9">
                                    <div className={`w-full h-48 ${isDarkTheme ? "bg-gray-700" : "bg-gray-100"} rounded-lg`}>
                                        {/* Replace with actual map component */}
                                        <div className="flex items-center justify-center h-full text-gray-500">
                                            Map placeholder
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
