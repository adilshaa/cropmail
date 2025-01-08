import React, { useState } from "react";
import Editor from "../components/Editor";
import { loadLocalTemplate, availableTemplates } from "../utils/templateLoader";

const Compose = () => {
	const [emailData, setEmailData] = useState({
		to: "",
		subject: "",
		content: "",
	});
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	// Example template HTML
	const templateHtml = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #333;">Welcome!</h1>
      <p style="color: #666;">
        Start editing this template...
      </p>
    </div>
  `;

	const handleHtmlChange = (html) => {
		setEmailData((prev) => ({
			...prev,
			content: html,
		}));
	};

	const handleTemplateChange = async (templateId) => {
		const html = await loadLocalTemplate(templateId);
		setSelectedTemplate(html);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email HTML Content:", emailData.content);
		// Handle email sending logic here
	};

	return (
		<div className="p-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="bg-white rounded-lg shadow-md p-4 space-y-2">
					<input
						type="email"
						placeholder="To"
						className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={emailData.to}
						onChange={(e) => setEmailData((prev) => ({ ...prev, to: e.target.value }))}
					/>
					<input
						type="text"
						placeholder="Subject"
						className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						value={emailData.subject}
						onChange={(e) => setEmailData((prev) => ({ ...prev, subject: e.target.value }))}
					/>

					<select
						className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						onChange={(e) => handleTemplateChange(e.target.value)}
					>
						<option value="">Select a template</option>
						{availableTemplates.map((template) => (
							<option key={template.id} value={template.id}>
								{template.name}
							</option>
						))}
					</select>
				</div>

				<Editor onHtmlChange={handleHtmlChange} initialHtml={selectedTemplate} />

				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
						onClick={() => {
							/* Save as draft logic */
						}}
					>
						Save as Draft
					</button>
					<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
						Send Email
					</button>
				</div>
			</form>
		</div>
	);
};

export default Compose;
