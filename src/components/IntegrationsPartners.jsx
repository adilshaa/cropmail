import React, { useState, useRef } from "react";
import { FaCheck, FaSlack, FaShopify, FaWordpress, FaHubspot, FaMailchimp } from "react-icons/fa";
const IntegrationParnters = ({ isDarkTheme }) => {
	return (
		<>
			<section className="py-20">
				<div className="max-w-6xl mx-auto px-4">
					<h3
						className={`text-2xl font-bold text-center mb-4 ${
							isDarkTheme ? "text-white" : "text-gray-900"
						}`}
					>
						Integrate with Your Favorite Tools
					</h3>
					<p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
						Seamlessly connect with over 100+ popular tools and platforms to streamline your workflow and
						maximize productivity
					</p>

					{/* Featured Integrations */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaShopify className="w-12 h-12 text-[#96bf47] mb-2" />
							<span className="text-sm font-medium">Shopify</span>
							<span className="text-xs text-gray-500">E-commerce</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaWordpress className="w-12 h-12 text-[#21759b] mb-2" />
							<span className="text-sm font-medium">WordPress</span>
							<span className="text-xs text-gray-500">CMS</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaSlack className="w-12 h-12 text-[#4a154b] mb-2" />
							<span className="text-sm font-medium">Slack</span>
							<span className="text-xs text-gray-500">Communication</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaHubspot className="w-12 h-12 text-[#ff7a59] mb-2" />
							<span className="text-sm font-medium">HubSpot</span>
							<span className="text-xs text-gray-500">CRM</span>
						</div>
						<div className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-all duration-300">
							<FaMailchimp className="w-12 h-12 text-[#ffe01b] mb-2" />
							<span className="text-sm font-medium">Mailchimp</span>
							<span className="text-xs text-gray-500">Marketing</span>
						</div>
					</div>

					{/* Integration Categories */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">E-commerce & Sales</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Shopify Integration
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									WooCommerce Sync
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Payment Gateways
								</li>
							</ul>
						</div>
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">Marketing Tools</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Social Media Platforms
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Analytics Tools
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									CRM Systems
								</li>
							</ul>
						</div>
						<div className={`p-6 rounded-lg ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`}>
							<h4 className="font-bold mb-4">Productivity</h4>
							<ul className="space-y-2">
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Team Collaboration
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									Project Management
								</li>
								<li className="flex items-center text-sm text-gray-600">
									<FaCheck className="w-4 h-4 text-green-500 mr-2" />
									File Sharing
								</li>
							</ul>
						</div>
					</div>

					{/* CTA */}
					<div className="text-center">
						<button className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
							View All Integrations
						</button>
					</div>
				</div>
			</section>
			;
		</>
	);
};

export default IntegrationParnters;
