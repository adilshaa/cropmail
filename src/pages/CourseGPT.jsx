import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, { Controls, Background, MarkerType } from "reactflow"; // Add MarkerType import
import { FaPaperPlane, FaExpand, FaCompress, FaCog } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import "reactflow/dist/style.css";
import "../styles/chat.css";
// import chatBoatSvg from "../../public/chat-bot-illustration.svg";
import { get, post } from "../services/apiService";

// Add new loading skeleton component
const MessageSkeleton = () => (
	<div className="w-full py-4">
		<div className="flex gap-6 animate-pulse">
			<div className="w-8 h-8 bg-gray-200 rounded-sm flex-shrink-0" />
			<div className="flex-1 space-y-3">
				<div className="h-4 bg-gray-200 rounded w-3/4" />
				<div className="h-4 bg-gray-200 rounded w-1/2" />
				<div className="h-32 bg-gray-200 rounded" />
			</div>
		</div>
	</div>
);

const CourseGPT = () => {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isDetailedView, setIsDetailedView] = useState(false);
	const [nodes, setNodes] = useState([]);
	const [edges, setEdges] = useState([]);
	const chatContainerRef = useRef(null);
	const [courseDetails, setCourseDetails] = useState(null);
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	const nodeTypes = {
		concept: "#e3f2fd", // Light blue
		practice: "#f3e5f5", // Light purple
		milestone: "#e8f5e9", // Light green
	};

	const createGraphElements = (graphData, detailed = true) => {
		const nodes = [];
		const edges = [];
		const nodePositions = {};
		let level = 0;
		let nodesInLevel = new Map();

		// Helper function to process nodes level by level
		const processNode = (nodeId, level) => {
			if (nodePositions[nodeId]) return;

			const node = graphData.nodes[nodeId];
			if (!nodesInLevel.has(level)) {
				nodesInLevel.set(level, 0);
			}

			const position = {
				x: level * 250,
				y: nodesInLevel.get(level) * 150,
			};

			nodesInLevel.set(level, nodesInLevel.get(level) + 1);
			nodePositions[nodeId] = position;

			nodes.push({
				id: nodeId,
				position,
				data: isDetailedView
					? {
							label: (
								<div className="p-3 max-w-xs">
									<h3 className="font-medium text-sm">{node.title}</h3>
									{detailed && (
										<>
											<p className="text-xs text-gray-600 mt-1">{node.description}</p>
											<div className="text-xs mt-1 text-gray-500">
												{node.estimatedTime && <p>⏱️ {node.estimatedTime}</p>}
												<p>🎯 {node.type}</p>
											</div>
										</>
									)}
								</div>
							),
					  }
					: { label: `${node.title}: \n ${node.description}` },
				style: {
					background: nodeTypes[node.type] || "#fff",
					border: "1px solid #e2e8f0",
					borderRadius: "12px",
					padding: "8px",
					fontSize: "12px",
					minWidth: detailed ? "200px" : "150px",
					boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
				},
			});

			node.nextSteps?.forEach((nextId) => {
				edges.push({
					id: `${nodeId}-${nextId}`,
					source: nodeId,
					target: nextId,
					type: "smoothstep",
					animated: true, // Add animation
					style: { stroke: "#94a3b8" }, // Add custom stroke color
					markerEnd: {
						type: MarkerType.ArrowClosed,
						width: 20,
						height: 20,
						color: "#94a3b8",
					},
				});
				processNode(nextId, level + 1);
			});
		};

		processNode(graphData.startNode, 0);
		return { nodes, edges };
	};

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				const response = await get(`/api/courses/${id}`);
				setCourseDetails(response.description);
			} catch (error) {
				console.error("Error fetching course details:", error);
			}
		};
		fetchCourseDetails();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage = { type: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		try {
			setIsLoading(true);
			const response = await post(`/api/prompt/${id}/analyze-pathway`, {
				userQuery: input,
			});

			if (response.pathwayAnalysis.responseType === "learning_path") {
				const { nodes: graphNodes, edges: graphEdges } = createGraphElements(
					response.pathwayAnalysis.pathwayResponse.pathway.graph,
					isDetailedView
				);
				setNodes(graphNodes);
				setEdges(graphEdges);

				setMessages((prev) => [
					...prev,
					{
						type: "gpt",
						responseType: "learning_path",
						content:
							response.pathwayAnalysis.pathwayResponse.pathway.queryAnalysis.focus +
							"\n \n" +
							response.pathwayAnalysis.pathwayResponse.pathway.queryAnalysis.contentCoverage,
						pathway: response.pathwayAnalysis.pathwayResponse,
					},
				]);
			} else {
				setMessages((prev) => [
					...prev,
					{
						type: "gpt",
						responseType: "conversation",
						content: response.pathwayAnalysis.conversationResponse.message,
					},
				]);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-white relative">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

			{/* Navbar */}
			<nav className="relative z-10 bg-white border-b py-4 px-4 md:px-6 flex justify-between items-center">
				<h1 className="text-xl font-bold text-[#202123]">Course Assistant</h1>
			</nav>

			{/* Chat Container */}
			<div
				ref={chatContainerRef}
				className="chat-container relative z-10 mx-auto space-y-6 h-[calc(100vh-180px)] overflow-y-auto scroll-smooth px-4 md:px-8 lg:px-80"
			>
				{isFirstLoad && messages.length === 0 ? (
					<div className="h-full flex flex-col items-center justify-center text-center px-4">
						<div className="w-48 h-48 mb-8 opacity-30">
							<img
								src="https://openclipart.org/image/800px/307415"
								alt="Chat Assistant"
								className="w-full h-full object-contain"
							/>
						</div>
						{courseDetails && (
							<>
								<h2 className="text-2xl font-bold text-gray-800 mb-2">
									Ask anything about {courseDetails.short}
								</h2>
								<p className="text-gray-600 mb-6 max-w-md">{courseDetails.description}</p>
								<div className="flex flex-wrap gap-2 justify-center">
									{[
										"The best path way to learn this ?",
										"Show me the learning path",
										"What will I learn?",
										"How long will it take?",
									].map((suggestion) => (
										<button
											key={suggestion}
											onClick={() => {
												setInput(suggestion);
												setIsFirstLoad(false);
												handleSubmit({ preventDefault: () => {} });
											}}
											className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
										>
											{suggestion}
										</button>
									))}
								</div>
							</>
						)}
					</div>
				) : (
					<>
						{messages.map((message, idx) => (
							<div
								key={idx}
								className={`w-full py-4 ${message.type === "user" ? "flex justify-end" : ""}`}
							>
								<div
									className={`flex gap-6 ${
										message.type === "user" ? "max-w-[85%] md:max-w-[60%]" : "w-full"
									}`}
								>
									{message.type !== "user" && (
										<div className="w-8 h-8 rounded-sm flex-shrink-0">
											<div className="bg-teal-600 w-full h-full rounded-sm" />
										</div>
									)}
									<div
										className={`flex-1 space-y-4 ${
											message.type === "user"
												? "bg-[#f8f9fa] text-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100"
												: "text-gray-800"
										}`}
									>
										{message.responseType === "learning_path" ? (
											<>
												<p className="leading-relaxed">{message.content}</p>
												<div className="bg-gray-50 rounded-lg p-4 mt-4">
													<div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
														<ReactFlow
															nodes={nodes}
															edges={edges}
															fitView
															className="bg-white"
															defaultEdgeOptions={{
																type: "smoothstep",
																animated: true,
																style: { strokeWidth: 2 },
																markerEnd: {
																	type: MarkerType.ArrowClosed,
																	width: 20,
																	height: 20,
																	color: "#94a3b8",
																},
															}}
														>
															<Controls className="bg-white shadow-md" />
															<Background className="bg-gray-50" />
														</ReactFlow>
													</div>
													<button
														onClick={() => setIsDetailedView(!isDetailedView)}
														className="mt-2 px-3 py-1 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50"
													>
														{isDetailedView ? (
															<span className="flex items-center gap-1">
																<FaCompress className="w-3 h-3" /> Simple View
															</span>
														) : (
															<span className="flex items-center gap-1">
																<FaExpand className="w-3 h-3" /> Detailed View
															</span>
														)}
													</button>
												</div>
											</>
										) : (
											<p className="leading-relaxed">{message.content}</p>
										)}
									</div>
								</div>
							</div>
						))}
						{isLoading && <MessageSkeleton />}
					</>
				)}
			</div>

			{/* Input Area */}
			<div className="fixed bottom-8 left-0 right-0 md:left-1/2 md:-translate-x-1/2 z-20 px-4 md:px-0">
				<form onSubmit={handleSubmit} className="relative max-w-[720px] mx-auto">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="w-full bg-white text-gray-800 rounded-xl pl-4 pr-12 py-3 focus:outline-none border border-gray-200 shadow-sm hover:border-gray-300 transition-colors"
						placeholder="Ask about the course..."
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
		</div>
	);
};

export default CourseGPT;
