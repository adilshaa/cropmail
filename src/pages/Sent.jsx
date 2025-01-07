// Sent.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidenav";
import { post } from "../services/apiService";
import PromptFooter from "../layouts/PromptFooter";
import EmailPreview from "../components/EmailPreview";
import EmailInbox from "../components/EmailInbox";

const Sent = () => {
	const [selected, setSelected] = useState("Inbox");
	const [prompt, setPrompt] = useState(""); // State to hold the prompt
	const [response, setResponse] = useState(null); // State to hold the API response
	const [editorContent, setEditorContent] = useState(""); // State to hold editor content

	const handlePromptChange = (e) => {
		setPrompt(e.target.value);
	};

	const sendPrompt = async () => {
		try {
			const data = { prompt }; // Prepare the data to send

			const result = await post("/api/generate-code", data); // Call the API
			setResponse(result); // Store the response
			setEditorContent(result?.code); // Update the editor content with the response
			console.log("API Response:", result);
		} catch (error) {
			console.error("Error sending prompt:", error);
		}
	};

	const handleEditorContentChange = (newContent) => {
		setEditorContent(newContent);
		console.log("Editor content changed:", newContent);
	};

	return (
		<div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
			<div className="flex flex-col flex-1 relative overflow-hidden">
				<main className="flex-1 px-2 overflow-y-auto pb-24">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold mb-2">{selected}</h2>
						<EmailInbox prompt={editorContent} />
						<EmailPreview apiResponse={response} onContentChange={handleEditorContentChange} />
					</div>
				</main>
				<div className="fixed bottom-4 ml-3 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50">
					<PromptFooter prompt={prompt} handlePromptChange={handlePromptChange} sendPrompt={sendPrompt} />
				</div>
			</div>
		</div>
	);
};

export default Sent;