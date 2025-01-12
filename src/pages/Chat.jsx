import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaCog, FaHistory, FaBookmark, FaUser } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import "../styles/chat.css";
import { post } from "../services/apiService";

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const chatContainerRef = useRef(null);

	const dummyProfile = {
		name: "John Doe",
		email: "john@example.com",
		avatar: "https://via.placeholder.com/40",
		role: "Premium Member",
	};

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const fetchCourseRecommendations = async (prompt) => {
		setIsLoading(true);
		try {
			const response = await post("/api/prompt/suggest", {
				prompt,
				limit: 5,
			});

			const data = await response;

			if (data.type === "conversation") {
				const newMessage = {
					type: "gpt",
					content: data.message,
				};
				setMessages((prev) => [...prev, newMessage]);
			} else if (data.type === "global_search") {
				const newMessage = {
					type: "gpt",
					heading: "Learning Resources",
					content: data.message,
					globalSearch: {
						matchScore: data.globalRecommendations.matchScore,
						enthusiasm: data.globalRecommendations.enthusiasm,
						reasoning: data.globalRecommendations.reasoning,
						analysis: data.globalRecommendations.analysis,
						resources: data.globalRecommendations.resources,
					},
				};
				setMessages((prev) => [...prev, newMessage]);
			} else {
				const newMessage = {
					type: "gpt",
					heading: "Course Recommendations",
					content: `Here are some course recommendations based on your interest in ${prompt}:`,
					suggestions: data.suggestions.map((course) => ({
						image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopcYTlgivx_Y2-6f2j4P_xAv1Wi3AMYGXCQ&s",
						name: course.name,
						description: course.description,
						reasoning: course.reasoning,
						matchScore: course.matchScore,
						enthusiasm: course.enthusiasm,
						highlights: course.highlights, // Map the highlights directly
						analysis: course.analysis,
					})),
				};
				setMessages((prev) => [...prev, newMessage]);
			}
		} catch (error) {
			console.error("Error fetching recommendations:", error);
			setMessages((prev) => [
				...prev,
				{
					type: "gpt",
					heading: "Error",
					content: "Sorry, there was an error getting course recommendations.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		setMessages((prev) => [...prev, { type: "user", content: input }]);
		setInput("");

		await fetchCourseRecommendations(input);
	};

	const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

	return (
		<div className="min-h-screen bg-white relative">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

			{/* Navbar */}
			<nav className="relative z-10 bg-white border-b py-4 px-4 md:px-6 flex justify-between items-center">
				<h1 className="text-xl font-bold text-[#202123]">Intcourse</h1>
				<div className="flex items-center gap-4">
					{/* Settings Button - Only visible on mobile */}
					<div className="relative md:hidden">
						<button
							onClick={toggleSettings}
							className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800"
						>
							<FaCog className={`transition-transform duration-300 ${isSettingsOpen ? "rotate-180" : ""}`} />
						</button>
						
						{/* Settings Dropdown for Mobile */}
						{isSettingsOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
								<div className="py-1">
									<button className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 flex items-center gap-3">
										<FaHistory className="w-4 h-4" />
										History
									</button>
									<button className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 flex items-center gap-3">
										<FaBookmark className="w-4 h-4" />
										Bookmarks
									</button>
									<button className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 flex items-center gap-3">
										<FaUser className="w-4 h-4" />
										Profile
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Profile Section */}
					<div className="relative">
						<img
							src={dummyProfile.avatar}
							alt="Profile"
							className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-600"
							onMouseEnter={() => setIsProfileOpen(true)}
							onMouseLeave={() => setIsProfileOpen(false)}
						/>
						{isProfileOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-[#202123] text-white rounded-lg shadow-lg p-4 border border-gray-600">
								<div className="text-sm">
									<p className="font-bold">{dummyProfile.name}</p>
									<p className="text-gray-600">{dummyProfile.email}</p>
									<p className="text-blue-600">{dummyProfile.role}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* Chat Container */}
			<div
				ref={chatContainerRef}
				className="chat-container relative z-10 mx-auto space-y-6 h-[calc(100vh-180px)] overflow-y-auto scroll-smooth px-4 md:px-8 lg:px-80"
			>
				{messages.map((message, idx) => (
					<div key={idx} className={`w-full py-4 ${message.type === "user" ? "flex justify-end" : ""}`}>
						<div className={`flex gap-6 ${message.type === "user" ? "max-w-[85%] md:max-w-[60%]" : "w-full"}`}>
							{message.type !== "user" && (
								<div className="w-8 h-8 rounded-sm flex-shrink-0">
									<div className="bg-teal-600 w-full h-full rounded-sm" />
								</div>
							)}
							<div
								className={`flex-1 space-y-4 ${
									message.type === "user"
										? "bg-[#f8f9fa] text-gray-800 px-4  py-2 rounded-full shadow-sm border border-gray-100"
										: "text-gray-800"
								}`}
							>
								{message.type === "gpt" && message.globalSearch ? (
									<>
										<h3 className="font-semibold text-lg">{message.heading}</h3>
										<p className="leading-relaxed">{message.content}</p>
										<div className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col gap-4">
											<div className="flex flex-col md:flex-row md:justify-between md:items-start">
												<div>
													<span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
														{message.globalSearch.matchScore}% Match {message.globalSearch.enthusiasm}
													</span>
													<p className="mt-2 text-sm text-blue-600">
														{message.globalSearch.reasoning}
													</p>
												</div>
											</div>

											<div className="border-t pt-4 mt-2">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
													<div>
														<h5 className="font-semibold mb-2">Benefits</h5>
														<ul className="list-disc list-inside text-sm text-gray-600">
															{message.globalSearch.analysis.benefits.map(
																(benefit, idx) => (
																	<li key={idx}>{benefit}</li>
																)
															)}
														</ul>
													</div>
													<div>
														<h5 className="font-semibold mb-2">Learning Outcomes</h5>
														<ul className="list-disc list-inside text-sm text-gray-600">
															{message.globalSearch.analysis.learningOutcomes.map(
																(outcome, idx) => (
																	<li key={idx}>{outcome}</li>
																)
															)}
														</ul>
													</div>
												</div>

												<div>
													<h5 className="font-semibold mb-2">Recommended Videos</h5>
													<div className="space-y-4">
														{message.globalSearch.resources.map((resource, idx) => (
															<div
																key={idx}
																className="bg-white p-4 rounded-lg border border-gray-200"
															>
																<div className="flex flex-col sm:flex-row gap-4">
																	<div className="w-full sm:w-48 h-32 flex-shrink-0">
																		<img 
																			src={resource.thumbnail} 
																			alt={resource.title}
																			className="w-full h-full object-cover rounded"
																		/>
																	</div>
																	<div className="flex-1 min-w-0">
																		<a 
																			href={resource.url}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="font-semibold text-blue-600 hover:underline line-clamp-2"
																		>
																			{resource.title}
																		</a>
																		
																		<div className="flex items-center gap-2 mt-2 flex-wrap">
																			<img 
																				src={resource.channelInfo.thumbnail}
																				alt={resource.channelInfo.name}
																				className="w-6 h-6 rounded-full"
																			/>
																			<a 
																				href={resource.channelInfo.url}
																				target="_blank"
																				rel="noopener noreferrer"
																				className="text-sm text-gray-600 hover:underline truncate"
																			>
																				{resource.channelInfo.name}
																			</a>
																		</div>
																		
																		<div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
																			<span>{resource.statistics.views} views</span>
																			<span>{resource.statistics.likes} likes</span>
																			<span>{resource.statistics.comments} comments</span>
																		</div>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</>
								) : message.type === "gpt" && message.suggestions ? (
									<>
										<h3 className="font-semibold text-lg">{message.heading}</h3>
										<p className="leading-relaxed">{message.content}</p>
										{message.suggestions?.map((suggestion, i) => (
											<div key={i} className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col gap-4">
												<div className="flex flex-col sm:flex-row gap-4">
													<div className="w-full sm:w-24 h-24 flex-shrink-0">
														<img
															src={suggestion.image}
															alt={suggestion.name}
															className="w-full h-full object-cover rounded"
														/>
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
															<h4 className="font-bold text-lg line-clamp-2">{suggestion.name}</h4>
															<span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded whitespace-nowrap">
																{suggestion.matchScore}% Match
															</span>
														</div>
														<p className="text-sm text-gray-600 mt-1 line-clamp-2">
															{suggestion.description}
														</p>
														<p className="text-sm text-blue-600 mt-2">
															{suggestion.reasoning}
														</p>
													</div>
												</div>

												<div className="border-t pt-4 mt-2">
													<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
														<div>
															<h5 className="font-semibold mb-2">Benefits</h5>
															<ul className="list-disc list-inside text-sm text-gray-600">
																{suggestion.highlights?.benefits?.map(
																	(benefit, idx) => (
																		<li key={idx}>{benefit}</li>
																	)
																)}
															</ul>
														</div>
														<div>
															<h5 className="font-semibold mb-2">Learning Outcomes</h5>
															<ul className="list-disc list-inside text-sm text-gray-600">
																{suggestion.highlights?.outcomes?.map(
																	(outcome, idx) => (
																		<li key={idx}>{outcome}</li>
																	)
																)}
															</ul>
														</div>
													</div>

													<div className="mt-4">
														<h5 className="font-semibold mb-2">
															Recommended Learning Path
														</h5>
														<ol className="list-decimal list-inside text-sm text-gray-600">
															{suggestion.highlights?.path?.map((step, idx) => (
																<li key={idx}>{step}</li>
															))}
														</ol>
													</div>
												</div>
											</div>
										))}
									</>
								) : (
									<p className="leading-relaxed">{message.content}</p>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Input Area */}
			<div className="fixed bottom-8 left-0 right-0 md:left-1/2 md:-translate-x-1/2 z-20 px-4 md:px-0">
				<form onSubmit={handleSubmit} className="relative max-w-[720px] mx-auto">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-full bg-white text-gray-800 rounded-xl pl-4 pr-12 py-3 focus:outline-none border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
						placeholder="Send a message..."
					/>
					<button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-40"
						disabled={isLoading}
					>
						{isLoading ? (
							<BiLoaderAlt className="animate-spin w-5 h-5" />
						) : (
							<FaPaperPlane className="w-5 h-5" />
						)}
					</button>
				</form>
			</div>

			{/* Bottom Left Accordion - Only visible on desktop */}
			<div className="hidden md:block fixed left-4 bottom-8 z-30 transition-all duration-300 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
				<div className="space-y-1">
					<button
						onClick={() => setIsAccordionOpen(!isAccordionOpen)}
						className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
					>
						<FaCog className={`transition-transform duration-300 ${isAccordionOpen ? "rotate-180" : ""}`} />
					</button>
					{isAccordionOpen && (
						<>
							<button className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
								<FaHistory />
							</button>
							<button className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
								<FaBookmark />
							</button>
							<button className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
								<FaUser />
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Chat;
