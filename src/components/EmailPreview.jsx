// EmailPreview.jsx
import React, { useState, useEffect } from "react";
import { FaEye, FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailPreview = ({ apiResponse, onContentChange }) => {
	const [activeTab, setActiveTab] = useState("preview");
	const [selectedEmailType, setSelectedEmailType] = useState("template");
	// Separate states for template and text content
	const [templateContent, setTemplateContent] = useState(`
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Monthly Update!</h1>
        <p>Dear Valued Partner,</p>
        <p>We are excited to share our latest insights and updates with you. Our team has been working diligently to drive innovation and enhance our services, ensuring you receive the best experience possible.</p>
        <p>This month, we rolled out several improvements that aim to streamline our processes and provide you with more value:</p>
        <ul>
          <li>New feature launch: Stay tuned for our upcoming products!</li>
          <li>Webinar series: Join us for informative sessions every week.</li>
          <li>Customer feedback initiatives: Your input is invaluable to us.</li>
        </ul>
        <p>For more details, click the button below:</p>
        <a href="#" class="button">Learn More</a>
        <p>Thank you for your continued partnership. We look forward to achieving great things together!</p>
        <p>Best regards,<br>Your Company Name</p>
        <div class="footer">
          <p>123 Business Road, Business City, BC 12345 | <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
	const [textContent, setTextContent] = useState('');

	useEffect(() => {
		if (apiResponse) {
			if (selectedEmailType === 'template') {
				setTemplateContent(apiResponse?.code || templateContent);
			} else {
				setTextContent(apiResponse?.code || textContent);
			}
		}
	}, [apiResponse]);

	const handleEditorChange = (value) => {
		// Update the appropriate content based on type
		if (selectedEmailType === 'template') {
			setTemplateContent(value);
		} else {
			setTextContent(value);
		}

		if (onContentChange) {
			onContentChange({
				content: value,
				type: selectedEmailType,
			});
		}
	};

	const handleEmailTypeClick = (type) => {
		setSelectedEmailType(type);
		// Pass the appropriate content based on the selected type
		if (onContentChange) {
			onContentChange({
				content: type === 'template' ? templateContent : textContent,
				type: type,
			});
		}
	};

	// Get current content based on selected type
	const getCurrentContent = () => {
		return selectedEmailType === 'template' ? templateContent : textContent;
	};

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ size: ["small", false, "large", "huge"] }],
			["bold", "italic", "underline", "strike"],
			[{ color: [] }, { background: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			[{ indent: '-1' }, { indent: '+1' }],  // Add indentation options
			["link", "image"],
			["clean"],
		],
		clipboard: {
			matchVisual: false // Prevents Quill from removing spaces
		},
		keyboard: {
			bindings: {
				tab: false,  // Preserve tab key behavior
				'indent backwards': false
			}
		}
	};

	// Add custom CSS to preserve whitespace
	const quillStyle = {
		whiteSpace: 'pre-wrap',
		wordBreak: 'break-word'
	};

	const formats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"color",
		"background",
		"list",
		"bullet",
		"align",
		"link",
		"image",
	];

	return (
		<div className="bg-white rounded-xl shadow-lg max-w-full mx-auto mb-4">
			<div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<h2 className="text-xl font-semibold text-gray-800">Email Preview</h2>
					<div className="flex rounded-lg bg-gray-100 p-1">
						<button
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								selectedEmailType === "template"
									? "bg-white text-gray-800 shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							}`}
							onClick={() => handleEmailTypeClick("template")}
						>
							Template
						</button>
						<button
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								selectedEmailType === "text"
									? "bg-white text-gray-800 shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							}`}
							onClick={() => handleEmailTypeClick("text")}
						>
							Text
						</button>
					</div>
				</div>

				<div className="flex rounded-lg bg-gray-100 p-1">
					<button
						className={`p-2 rounded-md flex items-center space-x-2 transition-all ${
							activeTab === "preview"
								? "bg-white text-gray-800 shadow-sm"
								: "text-gray-600 hover:text-gray-800"
						}`}
						onClick={() => setActiveTab("preview")}
					>
						<FaEye className="w-4 h-4" />
						<span className="text-sm font-medium">Preview</span>
					</button>
					{selectedEmailType !== "text" && (
						<button
							className={`p-2 rounded-md flex items-center space-x-2 transition-all ${
								activeTab === "source"
									? "bg-white text-gray-800 shadow-sm"
									: "text-gray-600 hover:text-gray-800"
							}`}
							onClick={() => setActiveTab("source")}
						>
							<FaCode className="w-4 h-4" />
							<span className="text-sm font-medium">Source</span>
						</button>
					)}
				</div>
			</div>

			<div className="p-6">
				<div className="h-[470px] rounded-lg overflow-hidden border border-gray-200">
					{activeTab === "preview" ? (
						selectedEmailType === "text" ? (
							<ReactQuill
								theme="snow"
								value={textContent}
								onChange={handleEditorChange}
								modules={modules}
								formats={formats}
								className="h-[400px] mb-12 bg-white"
								style={quillStyle}
								preserveWhitespace={true}
							/>
						) : (
							<iframe
								srcDoc={templateContent}
								title="Email Preview"
								className="w-full h-full bg-white"
								style={{ border: "none" }}
							/>
						)
					) : (
						<Editor
							height="100%"
							defaultLanguage="html"
							value={getCurrentContent()}
							onChange={handleEditorChange}
							theme="vs-light"
							options={{
								minimap: { enabled: false },
								scrollBeyondLastLine: false,
								fontSize: 14,
								padding: { top: 16 },
								fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace',
								lineNumbers: "on",
								roundedSelection: true,
								selectOnLineNumbers: true,
								renderLineHighlight: "all",
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmailPreview;
