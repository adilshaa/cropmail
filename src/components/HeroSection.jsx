import React from "react";
import { FaMailBulk, FaCheck, FaUser, FaArrowRight } from "react-icons/fa";

const HeroSection = ({ isDarkTheme }) => (
	<main className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-4">
		{/* Animated Background Gradient */}
		<div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 animate-gradient-xy"></div>

		{/* Enhanced Glass Card Effect */}
		<div className="relative backdrop-blur-lg bg-white/10 p-8 md:p-12 rounded-2xl shadow-xl max-w-5xl mx-auto">
			<div className="absolute -top-4 -left-4 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold transform -rotate-12">
				#1 Email Marketing Solution
			</div>

			<h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
				Revolutionize Your Email Marketing
			</h2>

			<div className="grid md:grid-cols-2 gap-8 mb-8">
				<div>
					<p
						className={`text-lg md:text-xl ${
							isDarkTheme ? "text-gray-300" : "text-gray-700"
						} mb-6 leading-relaxed`}
					>
						Transform your email campaigns with AI-powered automation, real-time analytics, and personalized
						content delivery.
					</p>
					<div className="flex flex-wrap gap-4 mb-6">
						<div className="flex items-center space-x-2">
							<div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
								<span className="text-2xl font-bold text-green-500">5x</span>
							</div>
							<span className="text-sm">Higher Open Rates</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
								<span className="text-2xl font-bold text-blue-500">3x</span>
							</div>
							<span className="text-sm">Better Conversion</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
								<span className="text-2xl font-bold text-purple-500">24/7</span>
							</div>
							<span className="text-sm">Support</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div
						className={`${isDarkTheme ? "bg-gray-800/50" : "bg-white/50"} p-4 rounded-lg backdrop-blur-sm`}
					>
						<h3 className="font-bold mb-2 flex items-center">
							<FaMailBulk className="text-blue-500 mr-2" /> Smart Automation
						</h3>
						<p className="text-sm opacity-80">
							Automate your email campaigns with AI-driven scheduling and segmentation
						</p>
					</div>
					<div
						className={`${isDarkTheme ? "bg-gray-800/50" : "bg-white/50"} p-4 rounded-lg backdrop-blur-sm`}
					>
						<h3 className="font-bold mb-2 flex items-center">
							<FaCheck className="text-green-500 mr-2" /> Advanced Analytics
						</h3>
						<p className="text-sm opacity-80">
							Track opens, clicks, and conversions in real-time with detailed insights
						</p>
					</div>
					<div
						className={`${isDarkTheme ? "bg-gray-800/50" : "bg-white/50"} p-4 rounded-lg backdrop-blur-sm`}
					>
						<h3 className="font-bold mb-2 flex items-center">
							<FaUser className="text-purple-500 mr-2" /> Personalization
						</h3>
						<p className="text-sm opacity-80">
							Deliver personalized content to each subscriber automatically
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
				<button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto">
					Start Free Trial
					<FaArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
				</button>
				<button
					className={`px-8 py-4 border-2 ${
						isDarkTheme ? "border-gray-700" : "border-gray-300"
					} rounded-full font-bold hover:border-blue-500 transition-colors w-full sm:w-auto`}
				>
					Watch Demo
				</button>
			</div>
		</div>

		{/* Floating Elements */}
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
			<div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
			<div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
		</div>
	</main>
);

export default HeroSection;
