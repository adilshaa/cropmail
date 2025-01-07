// EmailInbox.jsx
import React, { useState } from "react";
import { get, post } from "../services/apiService";
import Cookies from "js-cookie"; // Import js-cookie
import { useEffect } from "react";

const EmailInbox = ({ prompt }) => {
	const [emails, setEmails] = useState([]);
	const [emailInput, setEmailInput] = useState("");
	const [isInvalidEmail, setIsInvalidEmail] = useState(false);
	const [subject, setSubject] = useState(""); // State for subject
	const [refreshToken, setRefreshToken] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Retrieve the refresh token from cookies
		const refreshToken = Cookies.get("refreshToken");
		if (refreshToken) {
			setRefreshToken(refreshToken);
			console.log("Refresh Token:", refreshToken);
			// You can use the refresh token here as needed
		}
	}, []);
	const handleEmailInputChange = (e) => {
		setEmailInput(e.target.value);
		setIsInvalidEmail(false); // Reset the invalid state on input change
	};

	const handleEmailInputKeyDown = (e) => {
		if (e.key === "Enter" && emailInput.trim()) {
			addEmail();
		}
	};

	const addEmail = () => {
		const trimmedEmail = emailInput.trim();
		const emailRegex = /\S+@\S+\.\S+/; // Simple email regex for validation

		if (!emailRegex.test(trimmedEmail)) {
			setIsInvalidEmail(true); // Set invalid state if email is not valid
			return;
		}

		if (trimmedEmail && !emails.includes(trimmedEmail)) {
			setEmails([...emails, trimmedEmail]);
		}
		setEmailInput("");
	};

	const removeEmail = (index) => {
		setEmails(emails.filter((_, i) => i !== index));
	};

	const handleSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleSend = async () => {
		// Validate that at least one email is present
		if (emails.length === 0) {
			setIsInvalidEmail(true);
			return;
		}

		const payload = {
			emails,
			subject,
			template: prompt, // Assuming prompt is used as the template
			refreshToken: refreshToken || "",
		};

		try {
			const response = await post("/api/send-email", payload);

			if (response) {
				console.log("Emails sent successfully");
				setEmails([]); // Clear emails after sending
				setSubject(""); // Clear subject after sending
			} else {
				console.error("Failed to send emails");
			}
		} catch (error) {
			console.error("Error sending emails:", error);
		}
	};

	const getSummaryText = () => {
		if (emails.length === 0) return "No recipients";
		if (emails.length === 1) return emails[0];
		return `${emails[0]} +${emails.length - 1} more`;
	};

	return (
		<div className="bg-white rounded-xl shadow-lg max-w-full mx-auto mb-4">
			<div
				className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/80 transition-all"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<>
						<h2 className="text-xl font-semibold text-gray-800">New Message</h2>
						<svg
							className="w-5 h-5 text-gray-600 transform rotate-180 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</>
				) : (
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center space-x-6 flex-1">
							<span className="text-sm font-medium text-gray-700 w-40 truncate">{getSummaryText()}</span>
							<span className="text-sm text-gray-500 w-72 truncate">{subject || "No subject"}</span>
						</div>
						<div className="flex items-center space-x-4">
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleSend();
								}}
								className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
							>
								Send
							</button>
							<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
				)}
			</div>

			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					isOpen ? "max-h-[1000px] border-t border-gray-100" : "max-h-0"
				}`}
			>
				<div className="p-6">
					{/* Recipients Field */}
					<div className="mb-4">
						<div
							className={`flex items-center border-b ${
								isInvalidEmail ? "border-red-500" : "border-gray-300"
							} hover:border-blue-500 transition-colors`}
						>
							<div className="w-20 text-gray-600 text-sm">To:</div>
							<div className="flex-1 flex flex-wrap items-center min-h-[40px] p-2">
								{emails.map((email, index) => (
									<div
										key={index}
										className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 mr-2 mb-1"
									>
										<span className="text-sm text-gray-700">{email}</span>
										<button
											onClick={() => removeEmail(index)}
											className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
										>
											×
										</button>
									</div>
								))}
								<input
									type="text"
									placeholder="Add recipients"
									value={emailInput}
									onChange={handleEmailInputChange}
									onKeyDown={handleEmailInputKeyDown}
									className="flex-1 min-w-[100px] p-1 outline-none text-sm"
								/>
							</div>
						</div>
						{isInvalidEmail && (
							<p className="text-red-500 text-xs mt-1">Please enter valid email address(es)</p>
						)}
					</div>

					{/* Subject Field */}
					<div className="mb-4">
						<div className="flex items-center border-b border-gray-300 hover:border-blue-500 transition-colors">
							<div className="w-20 text-gray-600 text-sm">Subject:</div>
							<input
								type="text"
								placeholder="Add a subject"
								value={subject}
								onChange={handleSubjectChange}
								className="flex-1 p-2 outline-none text-sm"
							/>
						</div>
					</div>

					{/* Action Buttons - Fixed Structure */}
					<div className="flex items-center justify-between mt-6">
						<button
							onClick={handleSend}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
						>
							<span>Send</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
							</svg>
						</button>
						<button
							onClick={() => {
								setEmails([]);
								setSubject("");
							}}
							className="text-gray-600 hover:text-gray-800 px-4 py-2 font-medium"
						>
							Discard
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailInbox;
