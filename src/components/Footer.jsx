import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = ({ isDarkTheme }) => (
	<footer className={`${isDarkTheme ? "bg-gray-900" : "bg-gray-100"} pt-20 pb-10`}>
		<div className="max-w-6xl mx-auto px-4">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
				{/* Company Info */}
				<div>
					<h4 className="text-lg font-bold mb-4">About AICademy</h4>
					<p className="text-gray-600 mb-4">
						Revolutionizing AI education with industry-leading courses for all skill levels.
					</p>
					<div className="flex space-x-4">
						<FaTwitter className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
						<FaFacebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
						<FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
						<FaInstagram className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer" />
					</div>
				</div>

				{/* Product Links */}
				<div>
					<h4 className="text-lg font-bold mb-4">Product</h4>
					<ul className="space-y-2">
						{["Features", "Pricing", "API", "Documentation"].map((item) => (
							<li key={item}>
								<a href="#" className="text-gray-600 hover:text-blue-500">
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* Resources Links */}
				<div>
					<h4 className="text-lg font-bold mb-4">Resources</h4>
					<ul className="space-y-2">
						{["Blog", "Help Center", "Status", "Case Studies"].map((item) => (
							<li key={item}>
								<a href="#" className="text-gray-600 hover:text-blue-500">
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* Company Links */}
				<div>
					<h4 className="text-lg font-bold mb-4">Company</h4>
					<ul className="space-y-2">
						{["About Us", "Careers", "Contact", "Partners"].map((item) => (
							<li key={item}>
								<a href="#" className="text-gray-600 hover:text-blue-500">
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="border-t border-gray-300 pt-8">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-600 text-sm">&copy; 2023 AICademy. All rights reserved.</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						{["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
							<a
								key={item}
								href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
								className="text-gray-600 hover:text-blue-500 text-sm"
							>
								{item}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
