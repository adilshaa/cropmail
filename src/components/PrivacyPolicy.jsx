import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const PrivacyPolicy = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

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

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
                <div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl p-8`}>
                    <h1 className={`text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                        Privacy Policy
                    </h1>
                    <div className={`space-y-8 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                        <p className="mb-4 leading-relaxed">
                            Your privacy is important to us. It is Cropmail's policy to respect your privacy regarding any information we may collect from you across our website, https://cropmail.com, and other sites we own and operate.
                        </p>
                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                Information We Collect
                            </h2>
                            <p className="leading-relaxed">
                                We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                How We Use Information
                            </h2>
                            <p className="leading-relaxed">
                                We use the information we collect in various ways, including to provide, operate, and maintain our website, improve, personalize, and expand our website, understand and analyze how you use our website, develop new products, services, features, and functionality, communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                Security
                            </h2>
                            <p className="leading-relaxed">
                                We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                Contact Us
                            </h2>
                            <p className="leading-relaxed">
                                If you have any questions about our Privacy Policy, please contact us at support@cropmail.com.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
