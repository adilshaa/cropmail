import React from 'react';
import { FaCalendarAlt, FaClock, FaUserCircle, FaPaperPlane, FaPlus } from 'react-icons/fa';

const Schedule = () => {
    const scheduledEmails = [
        {
            id: 1,
            recipient: 'Marketing Team',
            subject: 'Weekly Newsletter',
            scheduledFor: '2024-01-20 09:00 AM',
            recipients: 15,
            status: 'pending'
        },
        // Add more scheduled emails as needed
    ];

    return (
        <div className="h-full bg-slate-50/50 backdrop-blur-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Scheduled Emails</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                    <FaPlus />
                    <span>Schedule New</span>
                </button>
            </div>

            {/* Schedule Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {scheduledEmails.map((email) => (
                    <div key={email.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-1">{email.subject}</h3>
                                <p className="text-sm text-gray-500">{email.recipient}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                                email.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaCalendarAlt className="text-gray-400" />
                                <span className="text-sm">{new Date(email.scheduledFor).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaClock className="text-gray-400" />
                                <span className="text-sm">{new Date(email.scheduledFor).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaUserCircle className="text-gray-400" />
                                <span className="text-sm">{email.recipients} recipients</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                <FaPaperPlane className="text-sm" />
                                Send Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Schedule;
