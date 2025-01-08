import React, { useRef, useEffect } from "react";
import EmailEditor from "react-email-editor";

const Editor = ({ onHtmlChange, initialHtml }) => {
	const emailEditorRef = useRef(null);

	const loadDesignFromHtml = async (html) => {
		if (!emailEditorRef.current || !html) return;

		try {
			// Convert HTML to design JSON using Unlayer's API
			const response = await fetch("https://api.unlayer.com/v2/import/html", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Add your Unlayer API key here
					Authorization: "Bearer YOUR_UNLAYER_API_KEY",
				},
				body: JSON.stringify({ html }),
			});

			const { design } = await response.json();
			console.log(design);

			emailEditorRef.current.editor.loadDesign(design);
		} catch (error) {
			console.error("Error converting HTML to design:", error);
			// Fallback: Load HTML directly (basic support)
			emailEditorRef.current.editor.loadDesign({
				body: {
					rows: [
						{
							cells: [
								{
									content: {
										html: html,
									},
								},
							],
						},
					],
				},
			});
		}
	};

	const onReady = () => {
		if (initialHtml) {
			loadDesignFromHtml(initialHtml);
		}
	};

	const exportHtml = () => {
		emailEditorRef.current.editor.exportHtml((data) => {
			const { html } = data;
			if (onHtmlChange) {
				onHtmlChange(html);
			}
		});
	};

	// Auto-save on changes
	useEffect(() => {
		const saveTimer = setInterval(() => {
			if (emailEditorRef.current) {
				exportHtml();
			}
		}, 3000); // Save every 3 seconds

		return () => clearInterval(saveTimer);
	}, []);

	const options = {
		appearance: {
			theme: "white",
			panels: {
				tools: {
					dock: "left",
				},
			},
		},
		projectId: 1234, // Replace with your Unlayer project ID
		tools: {
			// Customize available tools
			text: {
				enabled: true,
				position: 1,
			},
			image: {
				enabled: true,
				position: 2,
			},
			button: {
				enabled: true,
				position: 3,
			},
			divider: {
				enabled: true,
				position: 4,
			},
			social: {
				enabled: true,
				position: 5,
			},
			timer: {
				enabled: true,
				position: 6,
			},
			video: {
				enabled: true,
				position: 7,
			},
		},
		features: {
			colorPicker: {
				presets: ["#1a73e8", "#dc3545", "#28a745", "#ffc107", "#000000", "#ffffff"],
			},
		},
	};

	return (
		<div className="h-[600px] bg-white rounded-lg shadow-md">
			<EmailEditor ref={emailEditorRef} onReady={onReady} options={options} minHeight="600px" />
		</div>
	);
};

export default Editor;
