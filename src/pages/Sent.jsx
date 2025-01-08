import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import EmailInbox from "../components/EmailInbox";
import { FaInbox, FaSearch } from "react-icons/fa";

const Sent = () => {
	const [selected, setSelected] = useState("Inbox");
	const [emailPrompt, setEmailPrompt] = useState({ content: "", type: "template" });
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="flex flex-col h-screen bg-gray-50">  {/* Removed overflow-hidden */}
			{/* Background Pattern */}
			<div
				className="absolute inset-0 pointer-events-none" // Removed z-[-1], added pointer-events-none
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b5563' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					backgroundPosition: "0 0",
					backgroundSize: "60px 60px",
				}}
			/>
			{/* Content */}
			<div className="flex flex-col h-full relative"> {/* Added flex flex-col and h-full */}
				{/* Header */}
				<div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex-shrink-0"> {/* Added flex-shrink-0 */}
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4 flex-1">
							<h1 className="text-xl font-semibold text-gray-800 flex items-center whitespace-nowrap">
								<FaInbox className="mr-2 text-blue-500" />
								{selected}
							</h1>
							<div className="max-w-xl w-full">
								<div className="relative">
									<input
										type="text"
										placeholder="Search emails..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-10 pr-4 py-1.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-sm"
									/>
									<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className="flex-1 overflow-auto"> {/* Changed overflow-hidden to overflow-auto */}
					<div className="h-full px-4 py-3">
						<div className="max-w-[1400px] mx-auto">
							<div className="min-h-[calc(100vh-8rem)]">
								<EmailInbox prompt={emailPrompt} setPrompt={setEmailPrompt} />
							</div>
						</div>
					</div>
				</div>
				{/* Footer */}
				<div className="bg-white/80 backdrop-blur-sm border-t border-gray-100 px-6 py-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
					<div className="max-w-[1400px] mx-auto flex justify-between items-center">
						<p className="text-xs text-gray-400">{/* Add footer content if needed */}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sent;
