import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaClock, FaBook, FaMedal, FaDownload, FaPaperPlane, FaRobot } from "react-icons/fa";
import "./styles.css";
const CourseDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("overview");
	const [aiMessages, setAiMessages] = useState([
		{
			type: "ai",
			content: "Course Analysis",
			details: [
				"Modern web development focus",
				"Practical project-based learning",
				"Industry-relevant technologies",
				"Suitable for intermediate developers",
			],
		},
	]);
	const [userInput, setUserInput] = useState("");
	const chatContainerRef = useRef(null);

	// Auto scroll chat to bottom
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [aiMessages]);

	// Mock course data - replace with actual API call
	const course = {
		id,
		title: "Complete Web Development Bootcamp",
		description: "Learn web development from scratch with this comprehensive course.",
		instructor: {
			name: "John Doe",
			avatar: "https://via.placeholder.com/100",
			title: "Senior Web Developer",
			courses: 12,
			students: 50000,
		},
		price: 99.99,
		rating: 4.8,
		reviews: 2500,
		students: 12000,
		lastUpdated: "November 2023",
		language: "English",
		image: "https://via.placeholder.com/800x400",
		curriculum: [
			{
				title: "Getting Started",
				lessons: [
					{ title: "Introduction", duration: "5:00" },
					{ title: "Course Overview", duration: "10:00" },
				],
			},
			// Add more sections
		],
	};

	const handleEnroll = () => {
		navigate(`/home/pay?course=${id}`);
	};

	const handleSendMessage = () => {
		if (!userInput.trim()) return;

		setAiMessages((prev) => [...prev, { type: "user", content: userInput }]);
		setUserInput("");

		// Simulate AI response
		setTimeout(() => {
			setAiMessages((prev) => [
				...prev,
				{
					type: "ai",
					content: "Analysis",
					details: [
						"Based on your question about " + userInput,
						"This topic is covered in Module 3",
						"Recommended prerequisite: Basic JavaScript",
					],
				},
			]);
		}, 1000);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "overview":
				return (
					<div className="space-y-6">
						<div className="bg-blue-50 p-6 rounded-lg">
							<h3 className="text-xl font-bold mb-4">AI Course Analysis</h3>
							<div className="prose max-w-none">
								<ul className="list-disc pl-5 space-y-2">
									<li>Difficulty Level: Intermediate</li>
									<li>Estimated Time: 12 weeks</li>
									<li>Prerequisites: Basic JavaScript</li>
									<li>Learning Style: Project-based</li>
								</ul>
							</div>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg">
							<h3 className="text-xl font-bold mb-4">Course Overview</h3>
							<p>{course.description}</p>
						</div>
					</div>
				);
			case "curriculum":
				return (
					<div className="space-y-4">
						{course.curriculum.map((section, index) => (
							<div key={index} className="border rounded-lg overflow-hidden">
								<div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
									<h3 className="font-medium">{section.title}</h3>
									<span className="text-sm text-gray-500">{section.lessons.length} lessons</span>
								</div>
								<div className="divide-y">
									{section.lessons.map((lesson, lessonIndex) => (
										<div key={lessonIndex} className="px-6 py-4 flex justify-between items-center">
											<div className="flex items-center">
												<FaPlay className="text-gray-400 mr-3 w-4 h-4" />
												<span>{lesson.title}</span>
											</div>
											<span className="text-sm text-gray-500">{lesson.duration}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				);
			default:
				return null;
		}
	};

	const renderSidebar = () => {
		if (activeTab === "overview") {
			return (
				<div className="bg-white rounded-lg shadow-sm p-6">
					<div className="flex items-center mb-4">
						<FaRobot className="text-blue-500 mr-2" />
						<h3 className="font-bold text-lg">AI Assistant</h3>
					</div>

					<div ref={chatContainerRef} className="h-[400px] overflow-y-auto mb-4 space-y-4 custom-scrollbar">
						{aiMessages.map((message, idx) => (
							<div
								key={idx}
								className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[80%] rounded-lg p-3 ${
										message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
									}`}
								>
									<p className="text-sm">{message.content}</p>
									{message.details && (
										<ul className="mt-2 text-sm list-disc pl-4">
											{message.details.map((detail, i) => (
												<li key={i}>{detail}</li>
											))}
										</ul>
									)}
								</div>
							</div>
						))}
					</div>

					<div className="flex gap-2">
						<input
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
							placeholder="Ask about the course..."
							className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
						/>
						<button
							onClick={handleSendMessage}
							className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
						>
							<FaPaperPlane />
						</button>
					</div>
				</div>
			);
		}

		return (
			<div className="bg-white rounded-lg shadow-sm p-6">
				<h3 className="font-bold text-lg mb-4">Course Features</h3>
				<div className="space-y-4">
					<div className="flex items-center">
						<FaClock className="text-gray-400 mr-3" />
						<span>Duration: 52 hours</span>
					</div>
					<div className="flex items-center">
						<FaBook className="text-gray-400 mr-3" />
						<span>Lessons: 32</span>
					</div>
					<div className="flex items-center">
						<FaMedal className="text-gray-400 mr-3" />
						<span>Certificate of completion</span>
					</div>
					<div className="flex items-center">
						<FaDownload className="text-gray-400 mr-3" />
						<span>Downloadable resources</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<h1 className="text-4xl font-bold mb-4">{course.title}</h1>
							<p className="mb-6">{course.description}</p>
							<div className="flex items-center gap-4 mb-6">
								<div className="flex items-center">
									<FaStar className="text-yellow-400 mr-1" />
									<span>{course.rating}</span>
									<span className="ml-1">({course.reviews} reviews)</span>
								</div>
								<span>{course.students} students</span>
							</div>
							<div className="flex items-center gap-4">
								<button
									onClick={handleEnroll}
									className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
								>
									Enroll Now
								</button>
								<span className="text-2xl font-bold">${course.price}</span>
							</div>
						</div>
						<div className="relative">
							<img src={course.image} alt={course.title} className="rounded-lg shadow-xl" />
							<div className="absolute inset-0 flex items-center justify-center">
								<button className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors">
									<FaPlay className="text-blue-600 w-6 h-6" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<div className="mb-8">
							<div className="flex border-b">
								{["overview", "curriculum", "instructor", "reviews"].map((tab) => (
									<button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`px-6 py-3 font-medium ${
											activeTab === tab
												? "border-b-2 border-blue-500 text-blue-500"
												: "text-gray-500 hover:text-gray-700"
										}`}
									>
										{tab.charAt(0).toUpperCase() + tab.slice(1)}
									</button>
								))}
							</div>
						</div>

						{renderTabContent()}
					</div>

					<div className="space-y-6">{renderSidebar()}</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
