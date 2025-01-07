import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const TermsAndConditions = () => {
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
                        Terms and Conditions
                    </h1>
                    <div className={`space-y-8 ${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>
                        <p className="mb-4 leading-relaxed">
                            Welcome to Cropmail! These terms and conditions outline the rules and regulations for the use of Cropmail's Website and Services.
                        </p>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                1. Acceptance of Terms
                            </h2>
                            <p className="leading-relaxed">
                                By accessing and using our services, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these Terms, you must not use our service.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                2. User Accounts
                            </h2>
                            <p className="leading-relaxed">
                                When you create an account with us, you guarantee that the information you provide is accurate, complete, and current. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                3. Service Usage
                            </h2>
                            <p className="leading-relaxed">
                                Our service must not be used for any illegal or unauthorized purpose. You must not transmit any worms, viruses, or any code of a destructive nature.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must not spam or send unsolicited emails</li>
                                <li>You must respect email recipients' privacy and rights</li>
                                <li>You must comply with all applicable email regulations</li>
                                <li>You must maintain appropriate security measures</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                4. Payment Terms
                            </h2>
                            <p className="leading-relaxed">
                                Some aspects of the Service are provided for a fee. You will be required to pay all applicable fees for the Service you select and any applicable taxes.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                5. Intellectual Property
                            </h2>
                            <p className="leading-relaxed">
                                The Service and its original content, features, and functionality are owned by Cropmail and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                6. Termination
                            </h2>
                            <p className="leading-relaxed">
                                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                7. Limitation of Liability
                            </h2>
                            <p className="leading-relaxed">
                                In no event shall Cropmail, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                8. Changes to Terms
                            </h2>
                            <p className="leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h2 className={`text-2xl font-bold ${isDarkTheme ? "text-gray-100" : "text-gray-800"}`}>
                                Contact Information
                            </h2>
                            <p className="leading-relaxed">
                                If you have any questions about these Terms, please contact us at:
                                <br />
                                Email: support@cropmail.com
                                <br />
                                Address: [Your Company Address]
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
