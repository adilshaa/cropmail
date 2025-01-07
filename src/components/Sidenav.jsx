// Sidebar.jsx
import "../pages/styles.css";
import React, { useState, useEffect } from "react";
import {
	FaInbox,
	FaPaperPlane,
	FaFileAlt,
	FaUser,
	FaCog,
	FaCreditCard,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NavItem = ({ icon, text, onClick }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<li className="relative group">
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault();
					onClick();
				}}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				className="flex items-center justify-center p-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-500/50 transition-all duration-300"
			>
				{icon}
				{showTooltip && (
					<div className="absolute left-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md whitespace-nowrap shadow-lg pointer-events-none z-[9999]">
						{text}
						<div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-blue-600 pointer-events-none"></div>
					</div>
				)}
			</a>
		</li>
	);
};

const Sidebar = ({ selected, setSelected }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const closeSidebar = () => {
		setIsOpen(false);
	};

	// Close sidebar when screen size changes to large
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleNavigation = (path, section) => {
		setSelected(section);
		navigate(path); // Navigate to the specified path
	};

	return (
		<div className="relative isolate">
			<button
				onClick={toggleSidebar}
				className={`lg:hidden fixed top-4 p-2 mt-10 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 z-[100] shadow-lg`}
			>
				{isOpen ? <FaChevronLeft /> : <FaChevronRight />}
			</button>

			{isOpen && (
				<div
					onClick={closeSidebar}
					className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] lg:hidden"
				></div>
			)}

			<aside
				className={`fixed lg:static top-0 left-0 w-16 h-screen bg-blue-900/95 backdrop-blur-md border-r border-blue-400/30 flex flex-col justify-between transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0 transition-transform duration-300 ease-in-out z-[100] shadow-xl`}
			>
				<div className="flex flex-col items-center py-4">
					<div className="h-10 w-10 mb-6 rounded-full bg-blue-500/50 flex items-center justify-center">
						<img src="../assets/react.svg" alt="Logo" className="h-8 w-8" />
					</div>
					<ul className="space-y-4">
						<NavItem
							icon={<FaInbox className="w-6 h-6" />}
							text="Inbox"
							onClick={() => handleNavigation("/home", "Inbox")}
						/>
						<NavItem
							icon={<FaPaperPlane className="w-6 h-6" />}
							text="Sent"
							onClick={() => handleNavigation("/home/sent", "Sent")}
						/>
						<NavItem
							icon={<FaFileAlt className="w-6 h-6" />}
							text="Drafts"
							onClick={() => handleNavigation("/home/drafts", "Drafts")}
						/>
					</ul>
				</div>
				<div className="flex flex-col items-center py-4 border-t border-blue-400/30">
					<ul className="space-y-4">
						<NavItem
							icon={<FaUser className="w-6 h-6" />}
							text="Profile"
							onClick={() => handleNavigation("/home/profile", "Profile")}
						/>
						<NavItem
							icon={<FaCog className="w-6 h-6" />}
							text="Account Settings"
							onClick={() => handleNavigation("/home/settings", "Account Settings")}
						/>
						<NavItem
							icon={<FaCreditCard className="w-6 h-6" />}
							text="Billing"
							onClick={() => handleNavigation("/home/billing", "Billing")}
						/>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
