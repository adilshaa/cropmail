import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const CourseSearch = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		category: "",
		level: "",
		price: "",
	});
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const navigate = useNavigate();

	// Navigation menu refs and handlers
	const menuRefs = {
		Price: useRef(null),
		About: useRef(null),
		Contact: useRef(null),
	};

	const handleMouseEnter = (menuItem) => {
		if (menuRefs[menuItem]?.current) {
			menuRefs[menuItem].current.style.transform = "translateY(-2px)";
			menuRefs[menuItem].current.style.transition = "transform 0.2s ease-in-out";
		}
	};

	const handleMouseLeave = () => {
		Object.values(menuRefs).forEach((ref) => {
			if (ref.current) {
				ref.current.style.transform = "translateY(0)";
			}
		});
	};

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	// Mock categories and filters
	const categories = ["Web Development", "Mobile Development", "Data Science", "Design", "Business"];
	const levels = ["Beginner", "Intermediate", "Advanced"];
	const priceRanges = ["Free", "Paid", "Under $50", "Under $100"];

	// Mock course data
	const mockCourses = [
		{
			id: 1,
			title: "Complete Web Development Bootcamp",
			instructor: "John Doe",
			rating: 4.8,
			reviews: 2500,
			price: 99.99,
			image: "https://via.placeholder.com/300x200",
			category: "Web Development",
		},
		// Add more mock courses here
	];

	// Mock suggestions data
	const mockSuggestions = [
		"React.js Development",
		"React Native Mobile Apps",
		"React Hooks Masterclass",
		"React with TypeScript",
	];

	useEffect(() => {
		// Simulate API call
		setTimeout(() => {
			setCourses(mockCourses);
			setIsLoading(false);
		}, 1500);
	}, []);

	const handleSearch = () => {
		setIsSearching(true);
		setIsLoading(true);
		// Simulate search API call
		setTimeout(() => {
			setCourses(mockCourses);
			setIsLoading(false);
			setIsSearching(false);
		}, 1500);
	};

	const handleInputFocus = () => {
		if (searchQuery.length > 0) {
			setShowSuggestions(true);
			// Simulate fetching suggestions
			setSuggestions(mockSuggestions.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));
		}
	};

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
		if (e.target.value.length > 0) {
			setShowSuggestions(true);
			// Simulate fetching suggestions
			setSuggestions(mockSuggestions.filter((s) => s.toLowerCase().includes(e.target.value.toLowerCase())));
		} else {
			setShowSuggestions(false);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setSearchQuery(suggestion);
		setShowSuggestions(false);
		handleSearch();
	};

	const handleSearchFocus = () => {
		setIsExpanded(true);
		handleInputFocus();
	};

	const handleSearchBlur = (e) => {
		// Only collapse if clicking outside the search section
		const searchSection = document.getElementById("search-section");
		if (!searchSection.contains(e.relatedTarget)) {
			setIsExpanded(false);
		}
	};

	// Custom Select Component
	const CustomSelect = ({ options, value, onChange, placeholder }) => {
		const [isOpen, setIsOpen] = useState(false);
		const selectRef = useRef(null);

		useEffect(() => {
			const handleClickOutside = (event) => {
				if (selectRef.current && !selectRef.current.contains(event.target)) {
					setIsOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);
			return () => document.removeEventListener("mousedown", handleClickOutside);
		}, []);

		return (
			<div ref={selectRef} className="relative">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center ${
						isDarkTheme ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
					}`}
				>
					<span className={value ? "text-current" : "text-gray-500"}>{value || placeholder}</span>
					<FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
				</div>
				{isOpen && (
					<div
						className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg ${
							isDarkTheme ? "bg-gray-700" : "bg-white"
						} border ${isDarkTheme ? "border-gray-600" : "border-gray-200"}`}
					>
						{options.map((option) => (
							<div
								key={option}
								onClick={() => {
									onChange(option);
									setIsOpen(false);
								}}
								className={`p-3 cursor-pointer ${
									isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
								} ${value === option ? (isDarkTheme ? "bg-gray-600" : "bg-gray-100") : ""}`}
							>
								{option}
							</div>
						))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className={`min-h-screen ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
			<Navigation
				isDarkTheme={isDarkTheme}
				toggleTheme={toggleTheme}
				menuRefs={menuRefs}
				handleMouseEnter={handleMouseEnter}
				handleMouseLeave={handleMouseLeave}
			/>

			{/* Main content with padding-top to account for fixed navigation */}
			<div className="pt-20">
				{/* Search Section with Background Banner */}
				<div className="relative mb-8">
					{/* Background Banner */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />

					{/* Search Card */}
					<div className="max-w-7xl mx-auto px-4 relative z-10 py-8">
						<div
							id="search-section"
							className={`${
								isDarkTheme ? "bg-gray-800/90" : "bg-white/90"
							} rounded-lg shadow-md transition-all duration-300 backdrop-blur-md`}
						>
							<div className="p-6">
								<div className="relative">
									<div className="flex gap-4">
										<div className="flex-1 relative">
											<input
												type="text"
												placeholder="Search for courses..."
												className={`w-full p-4 pr-12 rounded-lg transition-all 
                          ${isDarkTheme ? "bg-gray-700 text-white" : "bg-white text-gray-900"}
                          border ${isDarkTheme ? "border-gray-600" : "border-gray-300"}
                          focus:outline-none focus:border-blue-500
                          placeholder-gray-400`}
												value={searchQuery}
												onChange={handleInputChange}
												onFocus={handleSearchFocus}
												onBlur={handleSearchBlur}
												tabIndex={1}
											/>
											{searchQuery && (
												<button
													onClick={() => {
														setSearchQuery("");
														setShowSuggestions(false);
													}}
													className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                            hover:text-gray-600 transition-colors"
												>
													<FaTimes />
												</button>
											)}
										</div>
										<button
											onClick={handleSearch}
											className="bg-blue-600 text-white px-8 rounded-lg hover:bg-blue-700 
                        flex items-center gap-2 transition-colors"
											disabled={isSearching}
											tabIndex={2}
										>
											<FaSearch />
											{isSearching ? "Searching..." : "Search"}
										</button>
									</div>

									{/* Search Suggestions */}
									{showSuggestions && (
										<div
											className={`absolute z-50 w-full mt-2 rounded-lg shadow-lg 
                      ${isDarkTheme ? "bg-gray-700" : "bg-white"} 
                      border ${isDarkTheme ? "border-gray-600" : "border-gray-200"}`}
										>
											{suggestions.map((suggestion, index) => (
												<div
													key={index}
													className={`p-3 cursor-pointer ${
														isDarkTheme ? "hover:bg-gray-600" : "hover:bg-gray-50"
													}`}
													onClick={() => handleSuggestionClick(suggestion)}
												>
													{suggestion}
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							{/* Expandable Filters */}
							<div
								className={`overflow-hidden transition-all duration-300 
                ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
							>
								<div className="p-6 border-t border-gray-100 dark:border-gray-100">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<CustomSelect
											options={categories}
											value={selectedFilters.category}
											onChange={(value) =>
												setSelectedFilters({ ...selectedFilters, category: value })
											}
											placeholder="Select Category"
											tabIndex={isExpanded ? 3 : -1}
										/>
										<CustomSelect
											options={levels}
											value={selectedFilters.level}
											onChange={(value) =>
												setSelectedFilters({ ...selectedFilters, level: value })
											}
											placeholder="Select Level"
											tabIndex={isExpanded ? 4 : -1}
										/>
										<CustomSelect
											options={priceRanges}
											value={selectedFilters.price}
											onChange={(value) =>
												setSelectedFilters({ ...selectedFilters, price: value })
											}
											placeholder="Select Price Range"
											tabIndex={isExpanded ? 5 : -1}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Course Grid */}
				<div className="max-w-7xl mx-auto px-4">
					<h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? "text-white" : "text-gray-900"}`}>
						{searchQuery ? "Search Results" : "Recommended Courses"}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{isLoading
							? Array(3)
									.fill(0)
									.map((_, index) => <CardSkeleton key={index} isDarkTheme={isDarkTheme} />)
							: courses.map((course) => (
									<div
										key={course.id}
										className={`${
											isDarkTheme ? "bg-gray-800" : "bg-white"
										} rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
										onClick={() => navigate(`/course/${course.id}`)}
									>
										<img
											src={course.image}
											alt={course.title}
											className="w-full h-48 object-cover"
										/>
										<div className="p-4">
											<h3 className="font-bold text-lg mb-2">{course.title}</h3>
											<p className="text-gray-600 mb-2">{course.instructor}</p>
											<div className="flex justify-between items-center">
												<div className="flex items-center">
													<FaStar className="text-yellow-400 mr-1" />
													<span>{course.rating}</span>
													<span className="text-gray-500 text-sm ml-1">
														({course.reviews})
													</span>
												</div>
												<span className="font-bold">${course.price}</span>
											</div>
										</div>
									</div>
							  ))}
					</div>
				</div>
			</div>
		</div>
	);
};

// Update CardSkeleton to support dark theme
const CardSkeleton = ({ isDarkTheme }) => (
	<div className={`${isDarkTheme ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-4 animate-pulse`}>
		<div className={`h-48 ${isDarkTheme ? "bg-gray-700" : "bg-gray-200"} rounded-lg mb-4`}></div>
		<div className={`h-6 ${isDarkTheme ? "bg-gray-700" : "bg-gray-200"} rounded w-3/4 mb-2`}></div>
		<div className={`h-4 ${isDarkTheme ? "bg-gray-700" : "bg-gray-200"} rounded w-1/2 mb-4`}></div>
		<div className="flex justify-between items-center">
			<div className={`h-4 ${isDarkTheme ? "bg-gray-700" : "bg-gray-200"} rounded w-1/4`}></div>
			<div className={`h-4 ${isDarkTheme ? "bg-gray-700" : "bg-gray-200"} rounded w-1/4`}></div>
		</div>
	</div>
);

export default CourseSearch;
