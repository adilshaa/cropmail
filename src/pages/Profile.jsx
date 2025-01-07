import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaEdit, FaCamera, FaKey, FaShieldAlt, FaHistory, FaBell } from "react-icons/fa";

const Profile = ({ user }) => {
    const [activeTab, setActiveTab] = useState('personal');

    user = {
        name: "John Doe",
        email: "john.doe@example.com",
        profilePicture: "https://via.placeholder.com/150",
        phone: "+1 234 567 8900",
        recovery: "recovery@email.com",
        lastLogin: "2 days ago",
        location: "New York, USA"
    };

    useEffect(() => {
        // Extract tokens from URL
        const params = new URLSearchParams(window.location.search);
        const refreshToken = params.get("refreshToken");
        const accessToken = params.get("accessToken");

        // Store tokens in cookies if available
        if (refreshToken) {
            Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });
        }
        if (accessToken) {
            Cookies.set("accessToken", accessToken, { secure: true, sameSite: "Strict" });
        }
    }, []);

    const handleSignIn = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/auth");
            const data = await response.json();
            window.location.href = data.url; // Redirect to Google OAuth URL
        } catch (error) {
            console.error("Error initiating OAuth flow", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-normal text-gray-800">Google Account</h1>
                    <p className="text-sm text-gray-600">Manage your info, privacy, and security</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column - Profile Overview */}
                    <div className="md:col-span-4">
                        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                            <div className="relative inline-block">
                                <img 
                                    src={user.profilePicture} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full mx-auto mb-4"
                                />
                                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                                    <FaCamera className="text-gray-600" />
                                </button>
                            </div>
                            <h2 className="text-2xl font-medium text-gray-800">{user.name}</h2>
                            <p className="text-gray-600 mb-4">{user.email}</p>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                Manage your Google Account
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:col-span-8">
                        <div className="bg-white rounded-lg shadow-sm divide-y">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-medium text-gray-800">Personal info</h3>
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <FaEdit size={20} />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-gray-800">{user.email}</p>
                                        </div>
                                        <FaShieldAlt className="text-green-500" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="text-gray-800">{user.phone}</p>
                                        </div>
                                        <FaShieldAlt className="text-green-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-medium text-gray-800 mb-4">Security</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <FaKey className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-gray-800 font-medium">Password</p>
                                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaBell className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-gray-800 font-medium">Recovery options</p>
                                            <p className="text-sm text-gray-500">{user.recovery}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FaHistory className="text-gray-400 mr-4" />
                                        <div>
                                            <p className="text-gray-800 font-medium">Recent activity</p>
                                            <p className="text-sm text-gray-500">Last login: {user.lastLogin}</p>
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

export default Profile;
