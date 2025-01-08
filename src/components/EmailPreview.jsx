// EmailPreview.jsx
import React, { useState, useEffect } from "react";
import { FaEye, FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EmailPreview = ({ apiResponse, onContentChange }) => {
	const [activeTab, setActiveTab] = useState("preview");
	const [selectedEmailType, setSelectedEmailType] = useState(null); // State for selected email type
	const [htmlContent, setHtmlContent] = useState(`
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

	useEffect(() => {
		if (apiResponse) {
			// Update the htmlContent with the API response
			console.log("API Response:", apiResponse);
			setHtmlContent(apiResponse?.code || htmlContent);
		}
	}, [apiResponse]);

	const handleEditorChange = (value) => {
		setHtmlContent(value);
		if (onContentChange) {
			onContentChange(value); // Emit changes to the parent
		}
	};

	const handleEmailTypeClick = (type) => {
		setSelectedEmailType(type);
	};

	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			[{ 'font': [] }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'align': [] }],
			['link', 'image'],
			['clean']
		],
	};

	const formats = [
		'header', 'font', 'size',
		'bold', 'italic', 'underline', 'strike',
		'color', 'background',
		'list', 'bullet',
		'align',
		'link', 'image'
	];

	return (
		<div className="bg-white rounded-lg shadow-md max-w-full mx-auto mb-2">
			<div className="border-b px-6 py-4 flex items-center justify-between">
				<div className="flex items-center">
					<h2 className="text-xl font-semibold text-gray-800">AI-Generated Email Preview</h2>

					<div className="flex space-x-2 ml-4">
						<button
							className={`px-3 py-1 rounded-md text-sm transition ${
								selectedEmailType === "template"
									? "bg-blue-600 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
							onClick={() => handleEmailTypeClick("template")}
						>
							Template
						</button>
						<button
							className={`px-3 py-1 rounded-md text-sm transition ${
								selectedEmailType === "text"
									? "bg-blue-600 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
							onClick={() => handleEmailTypeClick("text")}
						>
							Text
						</button>
					</div>
				</div>

				<div className="flex space-x-2">
					<button
						className={`p-2 rounded-md ${
							activeTab === "preview" ? "bg-gray-200 text-black" : "bg-gray-50 hover:bg-gray-100"
						}`}
						onClick={() => setActiveTab("preview")}
					>
						<FaEye />
					</button>
					{selectedEmailType !== "text" && (
						<button
							className={`p-2 rounded-md ${
								activeTab === "source" ? "bg-gray-200 text-black" : "bg-gray-50 hover:bg-gray-100"
							}`}
							onClick={() => setActiveTab("source")}
						>
							<FaCode />
						</button>
					)}
				</div>
			</div>

			<div className="p-6">
				<div className="h-[470px]">
					{activeTab === "preview" ? (
						selectedEmailType === "text" ? (
							<ReactQuill
								theme="snow"
								value={htmlContent}
								onChange={handleEditorChange}
								modules={modules}
								formats={formats}
								className="h-[400px] mb-12"
							/>
						) : (
							<iframe
								srcDoc={htmlContent}
								title="Email Preview"
								className="w-full h-full border border-gray-300 rounded-md"
							/>
						)
					) : (
						<Editor
							height="100%"
							defaultLanguage="html"
							value={htmlContent}
							onChange={handleEditorChange}
							theme="light"
							options={{
								minimap: { enabled: false },
								scrollBeyondLastLine: false,
								fontSize: 14,
								padding: { top: 16 },
							}}
							className="border border-gray-300 rounded-md"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmailPreview;
