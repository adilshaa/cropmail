// EmailInbox.jsx
import React, { useState, useEffect } from "react";
import { get, post } from "../services/apiService";
import Cookies from "js-cookie"; // Import js-cookie
import TemplateImportModal from "./TemplateImportModal";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSnackbar } from "../contexts/SnackbarContext";
import { FaPlus } from "react-icons/fa";

// Move TemplateSuggestions outside the component and memoize it properly
const TemplateSuggestions = React.memo(({ templates, onSelect, onMoreTemplates }) => (
    <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Suggested Templates</h3>
            <button
                onClick={onMoreTemplates}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
                <FaPlus className="w-4 h-4 mr-2" />
                More Templates
            </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
            {templates.map((template) => (
                <div
                    key={template.id}
                    onClick={() => onSelect(template)}
                    className="cursor-pointer group"
                >
                    <div className="aspect-video rounded-lg border-2 border-gray-200 group-hover:border-blue-500 overflow-hidden bg-white shadow-sm">
                        <div className="w-full h-full">
                            <div
                                className="w-full h-full"
                                dangerouslySetInnerHTML={{ __html: template.preview }}
                            />
                        </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        {template.name}
                    </p>
                </div>
            ))}
        </div>
    </div>
));

TemplateSuggestions.displayName = 'TemplateSuggestions';

const EmailInbox = ({ prompt, setPrompt }) => {
	// Add setPrompt as a prop
	const { showSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const [emails, setEmails] = useState([]);
	const [emailInput, setEmailInput] = useState("");
	const [isInvalidEmail, setIsInvalidEmail] = useState(false);
	const [subject, setSubject] = useState(""); // State for subject
	const [refreshToken, setRefreshToken] = useState("");
	const [isOpen, setIsOpen] = useState(true);
	const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
	const [selectedTemplateId, setSelectedTemplateId] = useState(null);
	const [selectedTemplateName, setSelectedTemplateName] = useState("");
	const [cc, setCc] = useState([]);
	const [ccInput, setCcInput] = useState("");
	const [replyTo, setReplyTo] = useState("");
	const [isCcInvalid, setIsCcInvalid] = useState(false);
	const [isReplyToInvalid, setIsReplyToInvalid] = useState(false);
	const [isTemplateRequired, setIsTemplateRequired] = useState(false);
	const [showTemplateSuggestions, setShowTemplateSuggestions] = useState(false);
	const [suggestedTemplates] = useState([
		{
			id: "welcome",
			name: "Welcome Email",
			preview: `
				<div style="font-family: Arial; padding: 20px; color: #2563eb;">
					<h2>Welcome!</h2>
					<p>Start your journey...</p>
				</div>
			`,
		},
		{
			id: "newsletter",
			name: "Newsletter",
			preview: `
				<div style="font-family: Arial; padding: 20px; color: #059669;">
					<h2>Newsletter</h2>
					<p>Latest updates...</p>
				</div>
			`,
		},
		{
			id: "promotion",
			name: "Promotion",
			preview: `
				<div style="font-family: Arial; padding: 20px; color: #dc2626;">
					<h2>Special Offer!</h2>
					<p>Limited time deal...</p>
				</div>
			`,
		},
	]);

	useEffect(() => {
		// Retrieve the refresh token from cookies
		const refreshToken = Cookies.get("refreshToken");
		if (refreshToken) {
			setRefreshToken(refreshToken);
			console.log("Refresh Token:", refreshToken);
			// You can use the refresh token here as needed
		}
	}, []);

	// Add effect to clear template error when prompt changes
	useEffect(() => {
		if (prompt?.content) {
			setIsTemplateRequired(false);
			setSelectedTemplateName(prompt.name || "Template Selected");
		}
	}, [prompt]);

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

	const handleCcInputChange = (e) => {
		setCcInput(e.target.value);
		setIsCcInvalid(false);
	};

	const handleCcInputKeyDown = (e) => {
		if (e.key === "Enter" && ccInput.trim()) {
			addCcEmail();
		}
	};

	const addCcEmail = () => {
		const trimmedEmail = ccInput.trim();
		const emailRegex = /\S+@\S+\.\S+/;

		if (!emailRegex.test(trimmedEmail)) {
			setIsCcInvalid(true);
			return;
		}

		if (trimmedEmail && !cc.includes(trimmedEmail)) {
			setCc([...cc, trimmedEmail]);
		}
		setCcInput("");
	};

	const removeCcEmail = (index) => {
		setCc(cc.filter((_, i) => i !== index));
	};

	const handleReplyToChange = (e) => {
		const value = e.target.value;
		setReplyTo(value);
		if (value && !/\S+@\S+\.\S+/.test(value)) {
			setIsReplyToInvalid(true);
		} else {
			setIsReplyToInvalid(false);
		}
	};

	const handleSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleSend = async () => {
		// Reset all error states
		setIsInvalidEmail(false);
		setIsCcInvalid(false);
		setIsReplyToInvalid(false);
		setIsTemplateRequired(false);

		let hasError = false;

		// Validate required fields
		if (emails.length === 0) {
			setIsInvalidEmail(true);
			hasError = true;
		}

		if (!prompt?.content) {
			setIsTemplateRequired(true);
			hasError = true;
		}

		if (replyTo && !/\S+@\S+\.\S+/.test(replyTo)) {
			setIsReplyToInvalid(true);
			hasError = true;
		}

		if (hasError) return;

		const payload = {
			emails,
			cc,
			replyTo,
			subject,
			template: prompt.content,
			emailType: prompt.type, // Add email type to payload
			refreshToken: refreshToken || "",
		};

		try {
			const response = await post("/auth/send-email", payload);

			if (response) {
				showSnackbar("Email sent successfully!", "success");
				setEmails([]); // Clear emails after sending
				setCc([]); // Clear cc after sending
				setReplyTo(""); // Clear reply-to after sending
				setSubject(""); // Clear subject after sending
			} else {
				showSnackbar("Failed to send email", "error");
			}
		} catch (error) {
			console.error("Error sending emails:", error);
			showSnackbar("Error sending email: " + error.message, "error");
		}
	};

	const getSummaryText = () => {
		if (emails.length === 0) return "No recipients";
		if (emails.length === 1) return emails[0];
		return `${emails[0]} +${emails.length - 1} more`;
	};

	const handleImportTemplates = () => {
		setIsTemplateModalOpen(true);
	};

	const handleSelectTemplate = (template) => {
		if (template.id === "new") {
			navigate("/home/template-editor");
		} else {
			setSelectedTemplateId(template.id);
			setSelectedTemplateName(template.name);
			setPrompt({
				content: template.content,
				type: "template",
				name: template.name,
			});
			setIsTemplateRequired(false); // Reset the template required state
			setIsTemplateModalOpen(false);
		}
	};

	// Memoize handlers and data
    const memoizedSuggestedTemplates = React.useMemo(() => suggestedTemplates, []);
    
    const handleSuggestedTemplateSelect = React.useCallback((template) => {
        setPrompt({
            content: template.preview,
            type: "template",
            name: template.name,
        });
        setSelectedTemplateName(template.name);
        setIsTemplateRequired(false);
    }, [setPrompt]);

    const handleMoreTemplates = React.useCallback(() => {
        setIsTemplateModalOpen(true);
    }, []);

	return (
		<>
			<div className="bg-white rounded-xl shadow-lg max-w-full mx-auto mb-4 overflow-hidden"> {/* Added overflow-hidden */}
				{/* Header section */}
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
								<span className="text-sm font-medium text-gray-700 w-40 truncate">
									{getSummaryText()}
								</span>
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
								<svg
									className="w-5 h-5 text-gray-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					)}
				</div>

					<div className={`transition-all duration-300 ease-in-out ${
						isOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden" /* Changed max-height and added overflow-y-auto */
					}`}>
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

						{/* CC Field */}
						<div className="mb-4">
							<div
								className={`flex items-center border-b ${
									isCcInvalid ? "border-red-500" : "border-gray-300"
								} hover:border-blue-500 transition-colors`}
							>
								<div className="w-20 text-gray-600 text-sm">Cc:</div>
								<div className="flex-1 flex flex-wrap items-center min-h-[40px] p-2">
									{cc.map((email, index) => (
										<div
											key={index}
											className="inline-flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 mr-2 mb-1"
										>
											<span className="text-sm text-gray-700">{email}</span>
											<button
												onClick={() => removeCcEmail(index)}
												className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
											>
												×
											</button>
										</div>
									))}
									<input
										type="text"
										placeholder="Add Cc recipients"
										value={ccInput}
										onChange={handleCcInputChange}
										onKeyDown={handleCcInputKeyDown}
										className="flex-1 min-w-[100px] p-1 outline-none text-sm"
									/>
								</div>
							</div>
							{isCcInvalid && (
								<p className="text-red-500 text-xs mt-1">Please enter valid email address(es)</p>
							)}
						</div>

						{/* Reply-To Field */}
						<div className="mb-4">
							<div
								className={`flex items-center border-b ${
									isReplyToInvalid ? "border-red-500" : "border-gray-300"
								} hover:border-blue-500 transition-colors`}
							>
								<div className="w-20 text-gray-600 text-sm">Reply-To:</div>
								<input
									type="email"
									placeholder="Add reply-to address"
									value={replyTo}
									onChange={handleReplyToChange}
									className="flex-1 p-2 outline-none text-sm"
								/>
							</div>
							{isReplyToInvalid && (
								<p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
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

						{/* Template Field */}
						<div className="mb-4 relative">
							<div
								className={`flex items-center border-b ${
									isTemplateRequired ? "border-red-500" : "border-gray-300"
								} hover:border-blue-500 transition-colors`}
							>
								<div className="w-20 text-gray-600 text-sm">Template:</div>
								<button
									onClick={handleImportTemplates}
									className="flex items-center text-blue-600 hover:text-blue-700 px-4 py-2 text-sm font-medium transition-colors duration-200"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									{selectedTemplateName || "Choose Template *"}
								</button>
							</div>
							{isTemplateRequired && (
								<p className="text-red-500 text-xs mt-1">Please select a template</p>
							)}
						</div>

						{/* Action Buttons */}
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
									setCc([]);
									setReplyTo("");
									setSubject("");
								}}
								className="text-gray-600 hover:text-gray-800 px-4 py-2 font-medium"
							>
								Discard
							</button>
						</div>

						{/* Template Suggestions Section */}
						<TemplateSuggestions 
							templates={memoizedSuggestedTemplates}
							onSelect={handleSuggestedTemplateSelect}
							onMoreTemplates={handleMoreTemplates}
						/>
					</div>
				</div>
			</div>

			{/* Template Import Modal */}
			<TemplateImportModal
				isOpen={isTemplateModalOpen}
				onClose={() => setIsTemplateModalOpen(false)}
				onSelectTemplate={handleSelectTemplate}
				currentTemplate={prompt?.content}
				selectedTemplateId={selectedTemplateId}
			/>
		</>
	);
};

export default EmailInbox;
