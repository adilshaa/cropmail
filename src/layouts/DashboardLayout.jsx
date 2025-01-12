import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaPlus } from "react-icons/fa";

const DashboardLayout = () => {
	const menuItems = [
		{ icon: FaHome, label: "Dashboard", path: "/author/dashboard" },
		{ icon: FaBook, label: "Courses", path: "/author/courses" },
		{ icon: FaUsers, label: "Students", path: "/author/students" },
		{ icon: FaChartLine, label: "Analytics", path: "/author/analytics" },
		{ icon: FaPlus, label: "New Course", path: "/author/new-course" },
		{ icon: FaCog, label: "Settings", path: "/author/settings" },
	];

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
				{/* Logo */}
				<div className="mb-8">
					<img src="/logo.png" alt="Logo" className="w-12 h-12" />
				</div>

				{/* Navigation */}
				<nav className="flex-1 space-y-8">
					{menuItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								`flex flex-col items-center text-sm ${
									isActive ? "text-teal-500" : "text-gray-500 hover:text-teal-500"
								}`
							}
						>
							<item.icon className="w-6 h-6 mb-1" />
							<span className="text-xs">{item.label}</span>
						</NavLink>
					))}
				</nav>

				{/* Logout */}
				<button className="mt-auto flex flex-col items-center text-gray-500 hover:text-teal-500">
					<FaSignOutAlt className="w-6 h-6 mb-1" />
					<span className="text-xs">Logout</span>
				</button>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
