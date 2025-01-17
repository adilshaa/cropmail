import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit } from "react-icons/fa";
import PageHeader from "./components/PageHeader";
import CourseModal from "./components/CourseModal";
import { get, post } from "../../services/apiService";
import { use } from "react";

const Courses = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [courses, setCourses] = useState([]);
	// const courses = [
	// 	{
	// 		id: 1,
	// 		image: "https://knowledge.hubspot.com/hubfs/freeonlinecourses-1.webp",
	// 		title: "React Complete Guide",
	// 		createdDate: "2024-01-15",
	// 		enrollCount: 234,
	// 		likes: 45,
	// 		status: "active",
	// 	},
	// 	{
	// 		id: 2,
	// 		image: "https://knowledge.hubspot.com/hubfs/freeonlinecourses-1.webp",
	// 		title: "React Complete Guide",
	// 		createdDate: "2024-01-15",
	// 		enrollCount: 234,
	// 		likes: 45,
	// 		status: "active",
	// 	},
	// 	{
	// 		id: 3,
	// 		image: "https://knowledge.hubspot.com/hubfs/freeonlinecourses-1.webp",
	// 		title: "React Complete Guide",
	// 		createdDate: "2024-01-15",
	// 		enrollCount: 234,
	// 		likes: 45,
	// 		status: "active",
	// 	},
	// 	// Add more courses...
	// ];

	const handleRowClick = (courseId) => {
		navigate(`/author/courses/${courseId}`);
	};

	const handelFetchData = async () => {
		// Fetch data from API
		const data = await get("api/courses", {});

		if (data) {
			setCourses(data);
		}
		console.log(data);
	};

	useEffect(() => {
		handelFetchData();
	}, []);

	return (
		<div className="p-8">
			<PageHeader title="My Courses">
				<div className="relative">
					<input
						type="text"
						placeholder="Search courses..."
						className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
				>
					<FaPlus className="mr-2" /> New Course
				</button>
			</PageHeader>

			<div className="bg-white rounded-lg shadow-sm border border-gray-200">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="bg-gray-50 border-b border-gray-200">
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Course</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Created Date</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Enrollments</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Likes</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
							</tr>
						</thead>
						<tbody>
							{courses.map((course) => (
								<tr key={course._id} className="border-b border-gray-200 hover:bg-gray-50">
									<td className="px-6 py-4 cursor-pointer" onClick={() => handleRowClick(course._id)}>
										<div className="flex items-center">
											<img
												src={course.image}
												alt={course.description.short}
												className="w-12 h-12 rounded-lg object-cover mr-4"
											/>
											<div>
												<h3 className="font-medium text-gray-800">
													{course.description.short}
												</h3>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">
										{new Date(course.analysis.lastAnalyzed).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 text-sm text-gray-500">{course.enrollCount || 0}</td>
									<td className="px-6 py-4 text-sm text-gray-500">{course.likes || 0}</td>
									<td className="px-6 py-4">
										<span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
											{course.status || "Active"}
										</span>
									</td>
									<td className="px-6 py-4">
										<button
											onClick={(e) => {
												e.stopPropagation();
												setSelectedCourse(course);
												setIsModalOpen(true);
											}}
											className="p-2 text-gray-500 hover:text-teal-500 transition-colors"
										>
											<FaEdit className="w-5 h-5" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<CourseModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedCourse(null);
				}}
				mode={selectedCourse ? "edit" : "create"}
				initialData={selectedCourse}
			/>
		</div>
	);
};

export default Courses;
