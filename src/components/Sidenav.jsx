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
	FaClock, // Add this import
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation import

const NavItem = ({ icon, text, onClick, isSelected }) => {
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
				className={`flex items-center justify-center p-3 rounded-xl text-blue-100 transition-all duration-300 
					${isSelected 
						? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30' 
						: 'hover:text-white hover:bg-white/10'
					}`}
			>
				{icon}
				{showTooltip && (
					<div className="absolute left-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-xl whitespace-nowrap shadow-xl pointer-events-none z-20 border border-gray-100/20">
						{text}
						<div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-white/90 pointer-events-none"></div>
					</div>
				)}
			</a>
		</li>
	);
};

const Sidebar = ({ selected, setSelected }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation(); // Add this hook

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

	const getSectionFromPath = (path) => {
		switch (path) {
			case "/home":
				return "Inbox";
			case "/home/sent":
				return "Sent";
			case "/home/drafts":
				return "Drafts";
			case "/home/schedule":
				return "Schedule";
			case "/home/profile":
				return "Profile";
			case "/home/settings":
				return "Account Settings";
			case "/home/billing":
				return "Billing";
			default:
				return "Inbox";
		}
	};

	useEffect(() => {
		const currentSection = getSectionFromPath(location.pathname);
		setSelected(currentSection);
	}, [location.pathname, setSelected]);

	return (
		<div className="relative isolate">
			<button
				onClick={toggleSidebar}
				className={`lg:hidden fixed top-4 p-2 mt-10 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 z-[100]`}
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
				className={`fixed lg:static top-0 left-0 w-20 h-screen bg-slate-900/95 backdrop-blur-md border-r border-white/5 flex flex-col justify-between transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0 transition-transform duration-300 ease-in-out z-[100] shadow-2xl`}
			>
				<div className="flex flex-col items-center py-6">
					<div className="h-12 w-12 mb-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center p-2.5 border border-white/10 shadow-lg">
						<img
							src="https://shreethemes.in/mortal_next/assets/images/logo-icon-40.png"
							alt="NoMail Logo"
							className="h-full w-full object-contain"
						/>
					</div>
					<ul className="space-y-5">
						<NavItem
							icon={<FaInbox className="w-6 h-6" />}
							text="Inbox"
							onClick={() => handleNavigation("/home", "Inbox")}
							isSelected={selected === "Inbox"}
						/>
						<NavItem
							icon={<FaPaperPlane className="w-6 h-6" />}
							text="Sent"
							onClick={() => handleNavigation("/home/sent", "Sent")}
							isSelected={selected === "Sent"}
						/>
						<NavItem
							icon={<FaFileAlt className="w-6 h-6" />}
							text="Drafts"
							onClick={() => handleNavigation("/home/drafts", "Drafts")}
							isSelected={selected === "Drafts"}
						/>
						<NavItem
							icon={<FaClock className="w-6 h-6" />}
							text="Schedule"
							onClick={() => handleNavigation("/home/schedule", "Schedule")}
							isSelected={selected === "Schedule"}
						/>
					</ul>
				</div>
				<div className="flex flex-col items-center py-6 border-t border-white/5">
					<ul className="space-y-5">
						<NavItem
							icon={<FaUser className="w-6 h-6" />}
							text="Profile"
							onClick={() => handleNavigation("/home/profile", "Profile")}
							isSelected={selected === "Profile"}
						/>
						<NavItem
							icon={<FaCog className="w-6 h-6" />}
							text="Account Settings"
							onClick={() => handleNavigation("/home/settings", "Account Settings")}
							isSelected={selected === "Account Settings"}
						/>
						<NavItem
							icon={<FaCreditCard className="w-6 h-6" />}
							text="Billing"
							onClick={() => handleNavigation("/home/billing", "Billing")}
							isSelected={selected === "Billing"}
						/>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
