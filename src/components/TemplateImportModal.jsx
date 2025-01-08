import React, { useState, useEffect } from "react";
import { FaTimes, FaRegFileCode, FaFolder, FaCloudUploadAlt, FaEdit, FaEye, FaCode, FaPlus } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { post, get } from "../services/apiService";
import PromptFooter from "../layouts/PromptFooter";
import { useSnackbar } from "../contexts/SnackbarContext";

const TemplateImportModal = ({ isOpen, onClose, onSelectTemplate, currentTemplate, selectedTemplateId }) => {
	const [activeTab, setActiveTab] = useState("current");
	const [importedTemplate, setImportedTemplate] = useState("");
	const [showEditor, setShowEditor] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [showPreview, setShowPreview] = useState(false);
	const { showSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const [activeSection, setActiveSection] = useState(null); // 'create', 'import', or 'ai'

	const [templates, setTemplates] = useState([
		{
			id: 1,
			name: "Welcome Email",
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Welcome to Our Service!</h1>
          <p style="color: #4b5563; line-height: 1.6;">
            We're excited to have you on board. Here's what you can expect...
          </p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1f2937;">Getting Started</h2>
            <ul style="color: #4b5563;">
              <li>Setup your profile</li>
              <li>Explore features</li>
              <li>Connect with others</li>
            </ul>
          </div>
          <button style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; border: none;">
            Get Started
          </button>
        </div>
      `,
			createdAt: "2024-01-15",
		},
		{
			id: 2,
			name: "Monthly Newsletter",
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #059669;">Monthly Updates</h1>
          <div style="border-left: 4px solid #059669; padding-left: 15px; margin: 20px 0;">
            <h2 style="color: #1f2937;">What's New</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Check out our latest features and improvements for this month...
            </p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <h3 style="color: #1f2937;">Feature 1</h3>
              <p style="color: #4b5563;">Amazing new capability...</p>
            </div>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <h3 style="color: #1f2937;">Feature 2</h3>
              <p style="color: #4b5563;">Enhanced performance...</p>
            </div>
          </div>
        </div>
      `,
			createdAt: "2024-01-20",
		},
		{
			id: 3,
			name: "Special Promotion",
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);">
          <h1 style="color: #dc2626; text-align: center;">Special Offer!</h1>
          <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; text-align: center;">50% OFF</h2>
            <p style="color: #4b5563; text-align: center; line-height: 1.6;">
              Limited time offer on all premium features...
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <button style="background: #dc2626; color: white; padding: 12px 24px; border-radius: 6px; border: none;">
                Claim Now
              </button>
            </div>
          </div>
          <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
            *Terms and conditions apply
          </p>
        </div>
      `,
			createdAt: "2024-01-25",
		},
		{
			id: 4,
			name: "Event Invitation",
			content: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
          <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #7c3aed; text-align: center;">You're Invited!</h1>
            <div style="border-top: 2px solid #7c3aed; border-bottom: 2px solid #7c3aed; padding: 20px 0; margin: 20px 0;">
              <h2 style="color: #1f2937; text-align: center;">Annual Tech Conference</h2>
              <p style="color: #4b5563; text-align: center; line-height: 1.6;">
                Join us for an amazing day of innovation and networking...
              </p>
            </div>
            <div style="text-align: center;">
              <button style="background: #7c3aed; color: white; padding: 12px 24px; border-radius: 6px; border: none;">
                RSVP Now
              </button>
            </div>
          </div>
        </div>
      `,
			createdAt: "2024-01-30",
		},
	]);

	// Reset to current tab when modal opens
	useEffect(() => {
		if (isOpen) {
			setActiveTab("current");
			fetchTemplates();
		}
	}, [isOpen]);

	const fetchTemplates = async () => {
		setIsLoading(true);
		try {
			const response = await get("/api/templates");
			setTemplates(response.data);
		} catch (error) {
			showSnackbar("Failed to fetch templates", "error");
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	const formatTemplateContent = (content) => {
		if (typeof content === "object") {
			return JSON.stringify(content, null, 2);
		}
		return content;
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target.result;
				setImportedTemplate(content);
				setShowEditor(true);
			};
			reader.readAsText(file);
		}
	};

	const handleImportTemplate = () => {
		if (importedTemplate) {
			onSelectTemplate({
				id: "imported",
				name: "Imported Template",
				content: importedTemplate,
			});
			onClose();
		}
	};

	const sendPrompt = async () => {
		try {
			const data = { prompt };
			const result = await post("/api/generate-code", data);
			if (result) {
				setImportedTemplate(result.code);
				showSnackbar("Template generated successfully!", "success");
				setShowEditor(true);
			}
		} catch (error) {
			console.error("Error generating template:", error);
			showSnackbar("Failed to generate template", "error");
		}
	};

	const PreviewPanel = ({ content }) => (
		<div className="border rounded-lg overflow-hidden h-[400px]">
			<div className="flex justify-between items-center p-3 border-b bg-gray-50">
				<h3 className="font-medium text-gray-700">Preview</h3>
				<button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
					<FaCode className="h-4 w-4" />
				</button>
			</div>
			<iframe
				srcDoc={content}
				title="Template Preview"
				className="w-full h-[calc(100%-48px)] bg-white"
				style={{ border: "none" }}
			/>
		</div>
	);

	const renderContentPanel = (content, isEditable = false) => (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<div className="space-x-4">
					<button
						onClick={() => setShowPreview(!showPreview)}
						className={`px-3 py-1 rounded-md text-sm font-medium ${
							showPreview ? "bg-gray-200" : "bg-blue-50 text-blue-600"
						}`}
					>
						{showPreview ? <FaCode className="inline mr-2" /> : <FaEye className="inline mr-2" />}
						{showPreview ? "Code" : "Preview"}
					</button>
				</div>
				{isEditable && (
					<button onClick={() => setShowEditor(false)} className="text-gray-500 hover:text-gray-700">
						Back
					</button>
				)}
			</div>

			{showPreview ? (
				<PreviewPanel content={content} />
			) : (
				<div className="h-[400px] border rounded-lg overflow-hidden">
					<Editor
						height="100%"
						defaultLanguage="html"
						value={content}
						onChange={isEditable ? (value) => setImportedTemplate(value) : undefined}
						theme="vs-light"
						options={{
							readOnly: !isEditable,
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							fontSize: 14,
							padding: { top: 16 },
						}}
					/>
				</div>
			)}
		</div>
	);

	const TemplateCard = ({ template, isSelected, onClick }) => (
		<div
			onClick={onClick}
			className={`relative group cursor-pointer rounded-lg border-2 transition-all ${
				isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
			}`}
		>
			<div className="aspect-[4/3] rounded-t-lg overflow-hidden bg-gray-50">
				<div className="w-full h-full transform scale-[0.6] origin-top-left">
					<iframe
						srcDoc={template.content}
						title={template.name}
						className="w-[166%] h-[166%]"
						style={{
							border: "none",
							pointerEvents: "none",
							transform: "scale(0.6)",
							transformOrigin: "top left",
						}}
					/>
				</div>
				<div className="absolute inset-0 group-hover:bg-black/5 transition-colors" />
			</div>
			<div className="p-3 border-t border-gray-200">
				<h3 className={`font-medium ${isSelected ? "text-blue-600" : "text-gray-800"}`}>{template.name}</h3>
				<p className="text-sm text-gray-500 mt-1">{new Date(template.createdAt).toLocaleDateString()}</p>
			</div>
		</div>
	);

	const CreationOptions = () => (
		<div className="flex gap-4 mb-6">
			<button
				onClick={() => setActiveSection("create")}
				className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
			>
				<FaPlus className="mr-2 h-4 w-4" />
				Create New
			</button>
			<button
				onClick={() => setActiveSection("import")}
				className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
			>
				<FaCloudUploadAlt className="mr-2 h-4 w-4" />
				Import File
			</button>
			<button
				onClick={() => setActiveSection("ai")}
				className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
			>
				<FaRegFileCode className="mr-2 h-4 w-4" />
				Generate with AI
			</button>
		</div>
	);

	const renderImportSection = () => {
		if (!activeSection) {
			return (
				<div className="space-y-6">
					<CreationOptions />
					{isLoading ? (
						<div className="text-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
							<p className="mt-4 text-gray-500">Loading templates...</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{templates.map((template) => (
								<TemplateCard
									key={template.id}
									template={template}
									isSelected={selectedTemplateId === template.id}
									onClick={() => {
										onSelectTemplate(template);
										setActiveTab("current");
									}}
								/>
							))}
						</div>
					)}
				</div>
			);
		}

		const sections = {
			create: (
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-medium text-gray-800">Create New Template</h3>
						<button onClick={() => setActiveSection(null)} className="text-gray-500 hover:text-gray-700">
							Back to Templates
						</button>
					</div>
					{renderContentPanel("", true)}
				</div>
			),
			import: (
				<div className="space-y-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-medium text-gray-800">Import Template</h3>
						<button onClick={() => setActiveSection(null)} className="text-gray-500 hover:text-gray-700">
							Back to Templates
						</button>
					</div>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
						<input
							id="file-upload"
							type="file"
							className="hidden"
							accept=".html,.htm"
							onChange={handleFileUpload}
						/>
						<FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400 mb-3" />
						<p className="text-gray-600">Drag and drop your template file here</p>
						<p className="text-sm text-gray-500 mt-2">or</p>
						<label
							htmlFor="file-upload"
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block cursor-pointer"
						>
							Browse Files
						</label>
					</div>
					{importedTemplate && renderContentPanel(importedTemplate, true)}
				</div>
			),
			ai: (
				<div className="space-y-4">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-medium text-gray-800">Generate Template with AI</h3>
						<button onClick={() => setActiveSection(null)} className="text-gray-500 hover:text-gray-700">
							Back to Templates
						</button>
					</div>
					<div className="bg-gray-50 rounded-lg p-6">
						<PromptFooter
							prompt={prompt}
							handlePromptChange={(e) => setPrompt(e.target.value)}
							sendPrompt={sendPrompt}
						/>
					</div>
					{importedTemplate && renderContentPanel(importedTemplate, true)}
				</div>
			),
		};

		return sections[activeSection];
	};

	const showImportButton = () => {
		// Show import button if we're in import tab and have content
		if (activeTab === 'import') {
			// Show button if there's imported content
			if (importedTemplate) return true;
			
			// Show button when in any section with content
			if (activeSection && (showEditor || importedTemplate)) return true;
		}
		return false;
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
					<h2 className="text-xl font-semibold text-gray-800">Import Template</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
						<FaTimes size={20} />
					</button>
				</div>

				{/* Tabs */}
				<div className="flex border-b border-gray-200 flex-shrink-0">
					{["current", "yours", "import"].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`flex-1 px-6 py-3 text-sm font-medium ${
								activeTab === tab
									? "border-b-2 border-blue-500 text-blue-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							{tab === "current" && "Current Template"}
							{tab === "yours" && "Your Templates"}
							{tab === "import" && "Import Templates"}
						</button>
					))}
				</div>

				{/* Content */}
				<div className="p-6 overflow-y-auto flex-grow">
					{activeTab === "current" && (
						<div className="space-y-4">
							<h3 className="text-lg font-medium text-gray-800">Current Template</h3>
							{renderContentPanel(currentTemplate || "No template selected")}
						</div>
					)}

					{activeTab === "yours" && (
						<div className="space-y-6">
							{isLoading ? (
								<div className="text-center py-12">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
									<p className="mt-4 text-gray-500">Loading templates...</p>
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{templates.map((template) => (
										<TemplateCard
											key={template.id}
											template={template}
											isSelected={selectedTemplateId === template.id}
											onClick={() => {
												onSelectTemplate(template);
												setActiveTab("current");
											}}
										/>
									))}
								</div>
							)}
						</div>
					)}

					{activeTab === "import" && renderImportSection()}
				</div>

				{/* Fixed Footer */}
				<div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4 flex-shrink-0 bg-white">
					<button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
						Cancel
					</button>
						{showImportButton() && (
							<button
								onClick={handleImportTemplate}
								className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
							>
								Import Template
							</button>
						)}
				</div>
			</div>
		</div>
	);
};

export default TemplateImportModal;
