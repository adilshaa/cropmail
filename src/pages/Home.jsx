// Home.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Sidebar from "../components/Sidenav";
import { post } from "../services/apiService"; // Import the post method

const Home = () => {
	const [selected, setSelected] = useState("Inbox");
	const [prompt, setPrompt] = useState(""); // State to hold the prompt
	const [response, setResponse] = useState(null); // State to hold the API response

	const handlePromptChange = (e) => {
		setPrompt(e.target.value);
	};

	const sendPrompt = async () => {
		try {
			const data = { prompt }; // Prepare the data to send
			console.log(prompt);

			const result = await post("/generate-code", data); // Call the API
			setResponse(result); // Store the response
			console.log("API Response:", result);
		} catch (error) {
			console.error("Error sending prompt:", error);
		}
	};

	return (
		<div className="flex h-screen bg-gray-100 overflow-hidden">
			<Sidebar selected={selected} setSelected={setSelected} />
			
			<div className="flex-1 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
