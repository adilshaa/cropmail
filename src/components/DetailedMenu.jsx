import React from "react";
import { FaDollarSign } from "react-icons/fa"; // Importing an icon from react-icons

const DetailedMenu = ({ hoveredMenu, menuPosition }) => {
	if (!hoveredMenu) return null;

	const renderContent = () => {
		switch (hoveredMenu) {
			case "Price":
				return (
					<div className="p-6 bg-white rounded-lg shadow-md text-left">
						<div className="flex items-center mb-4">
							<FaDollarSign className="text-2xl text-blue-500 mr-2" />
							<h2 className="text-2xl font-bold">Pricing Plans</h2>
						</div>
						<p className="text-gray-600">
							Choose the best plan that fits your needs. We offer flexible pricing options to suit
							different requirements.
						</p>
					</div>
				);
			case "About":
				return <p>Information about our company and mission.</p>;
			case "Contact":
				return <p>Contact details and customer support information.</p>;
			default:
				return <p>More details about {hoveredMenu}</p>;
		}
	};

	return (
		<div
			className="absolute bg-white shadow-lg rounded p-4 border border-gray-300"
			style={{
				top: menuPosition.top,
				left: menuPosition.left,
				zIndex: 1000, // Add z-index here
			}}
		>
			{renderContent()}
		</div>
	);
};

export default DetailedMenu;
