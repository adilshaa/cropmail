import React from "react";
import { FaCamera, FaEdit, FaBell, FaShieldAlt, FaKey, FaHistory, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
	return (
		<div className="h-full bg-slate-50/50  p-6">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="relative inline-block">
						<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
							<img
								src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</div>
						<button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
							<FaCamera />
						</button>
					</div>
					<h1 className="text-2xl font-bold text-gray-800 mt-4">John Doe</h1>
					<p className="text-gray-500">john.doe@example.com</p>
				</div>

				{/* Profile Sections */}
				<div className="grid gap-6">
					{/* Personal Information */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
							<button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
								<FaEdit className="text-gray-600" />
							</button>
						</div>
						<div className="grid gap-4">
							<div>
								<label className="text-sm text-gray-500">Full Name</label>
								<p className="text-gray-800">John Doe</p>
							</div>
							<div>
								<label className="text-sm text-gray-500">Email</label>
								<p className="text-gray-800">john.doe@example.com</p>
							</div>
							<div>
								<label className="text-sm text-gray-500">Phone</label>
								<p className="text-gray-800">+1 (555) 123-4567</p>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-3">
							<div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
								<FaBell />
							</div>
							<span className="font-medium text-gray-800">Notifications</span>
						</button>
						<button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-3">
							<div className="p-3 bg-green-50 text-green-500 rounded-xl">
								<FaShieldAlt />
							</div>
							<span className="font-medium text-gray-800">Security</span>
						</button>
						<button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-3">
							<div className="p-3 bg-yellow-50 text-yellow-500 rounded-xl">
								<FaKey />
							</div>
							<span className="font-medium text-gray-800">Change Password</span>
						</button>
					</div>

					{/* Security Settings */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
						</div>
						<div className="space-y-4">
							<button className="w-full p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group transition-all">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-100">
										<FaKey />
									</div>
									<div className="text-left">
										<h3 className="font-medium text-gray-800">Change Password</h3>
										<p className="text-sm text-gray-500">Update your password</p>
									</div>
								</div>
								<FaEdit className="text-gray-400" />
							</button>

							<button className="w-full p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between group transition-all">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-purple-50 text-purple-500 rounded-xl group-hover:bg-purple-100">
										<FaShieldAlt />
									</div>
									<div className="text-left">
										<h3 className="font-medium text-gray-800">Two-Factor Auth</h3>
										<p className="text-sm text-gray-500">Extra security for your account</p>
									</div>
								</div>
								<FaEdit className="text-gray-400" />
							</button>
						</div>
					</div>

					{/* Activity Log - Fixed Structure */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
							<button className="text-blue-500 text-sm hover:underline">View All</button>
						</div>
						<div className="space-y-4">
							{[
								{ action: "Password changed", date: "2 hours ago", icon: FaKey },
								{ action: "Logged in from new device", date: "Yesterday", icon: FaHistory },
								{ action: "Updated profile picture", date: "3 days ago", icon: FaCamera },
							].map((activity, index) => (
								<div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50">
									<div className="p-2 bg-gray-100 rounded-lg">
										<activity.icon className="text-gray-600" />
									</div>
									<div>
										<p className="font-medium text-gray-800">{activity.action}</p>
										<p className="text-sm text-gray-500">{activity.date}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Logout Button - Fixed Structure */}
					<button className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center gap-2 text-red-600 font-medium transition-colors">
						<FaSignOutAlt />
						<span>Sign Out</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
