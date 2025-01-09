import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";

const Courses = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const courses = [
		{
			id: 1,
			title: "Complete Web Development Bootcamp",
			instructor: "John Doe",
			price: 99.99,
			rating: 4.8,
			students: 12000,
			category: "development",
			image: "https://via.placeholder.com/300x200",
			level: "Beginner",
		},
		// Add more course data
	];

	const categories = [
		{ id: "all", name: "All Courses" },
		{ id: "development", name: "Development" },
		{ id: "business", name: "Business" },
		{ id: "design", name: "Design" },
		{ id: "marketing", name: "Marketing" },
	];

	const filteredCourses = courses.filter((course) => {
		const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Search and Filter Section */}
				<div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
					<div className="relative flex-1">
						<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Search courses..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<div className="flex gap-2">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`px-4 py-2 rounded-full ${
									selectedCategory === category.id
										? "bg-blue-500 text-white"
										: "bg-white text-gray-700 hover:bg-gray-100"
								}`}
							>
								{category.name}
							</button>
						))}
					</div>
				</div>

				{/* Courses Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredCourses.map((course) => (
						<Link to={`/course/${course.id}`} key={course.id} className="block">
							<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
								<img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
								<div className="p-6">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-blue-500">{course.category}</span>
										<span className="text-sm text-gray-500">{course.level}</span>
									</div>
									<h3 className="text-xl font-bold mb-2">{course.title}</h3>
									<p className="text-gray-600 mb-4">By {course.instructor}</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<FaStar className="text-yellow-400 mr-1" />
											<span className="font-medium">{course.rating}</span>
											<span className="text-gray-500 ml-2">({course.students} students)</span>
										</div>
										<span className="text-lg font-bold">${course.price}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Courses;
