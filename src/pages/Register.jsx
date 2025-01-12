import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaBriefcase, FaGraduationCap, FaArrowRight, FaArrowLeft, FaGoogle, FaLinkedin } from "react-icons/fa";
import { post } from "../services/apiService";

const Register = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		businessType: "",
		businessName: "",
		purpose: "",
		expertise: "",
		teachingExperience: "",
		courseTopics: "",
	});
	const [errors, setErrors] = useState({});
	const [stepsCompleted, setStepsCompleted] = useState({
		step1: false,
		step2: false,
		step3: false,
	});

	// Prevent page reload/back
	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Prevent back button
		window.history.pushState(null, null, window.location.pathname);
		window.addEventListener("popstate", () => {
			window.history.pushState(null, null, window.location.pathname);
		});

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			window.removeEventListener("popstate", () => {});
		};
	}, []);

	const validateField = (name, value) => {
		switch (name) {
			case "email":
				return !value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ? "Please enter a valid email" : "";
			case "password":
				return value.length < 6 ? "Password must be at least 6 characters" : "";
			case "name":
				return !value.trim() ? "Name is required" : "";
			default:
				return !value.trim() ? `${name} is required` : "";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
	};

	const validateStep1 = (data) => {
		const errors = {};
		if (!data.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
			errors.email = "Please enter a valid email";
		}
		if (data.password.length < 6) {
			errors.password = "Password must be at least 6 characters";
		}
		if (!data.password.match(/\d/)) {
			errors.password = "Password must contain at least one number";
		}
		if (data.name.trim().length < 2) {
			errors.name = "Name must be at least 2 characters";
		}
		return errors;
	};

	const validateStep2 = (data) => {
		const errors = {};
		const validBusinessTypes = ["individual", "business", "institution"];
		if (!validBusinessTypes.includes(data.businessType)) {
			errors.businessType = "Please select a valid business type";
		}
		if (!data.businessName.trim()) {
			errors.businessName = "Business name is required";
		}
		if (!data.purpose.trim()) {
			errors.purpose = "Purpose is required";
		}
		return errors;
	};

	const validateStep3 = (data) => {
		const errors = {};
		const expertise = data.expertise.split(",").map((item) => item.trim());
		const topics = data.courseTopics.split(",").map((item) => item.trim());

		if (expertise.length === 0) {
			errors.expertise = "At least one expertise is required";
		}
		if (!data.teachingExperience.trim()) {
			errors.teachingExperience = "Teaching experience is required";
		}
		if (topics.length === 0) {
			errors.courseTopics = "At least one course topic is required";
		}
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let currentErrors = {};

		switch (step) {
			case 1:
				if (stepsCompleted.step1) {
					setStep(2);
					return;
				}
				currentErrors = validateStep1(formData);
				break;
			case 2:
				if (stepsCompleted.step2) {
					setStep(3);
					return;
				}
				currentErrors = validateStep2(formData);
				break;
			case 3:
				if (stepsCompleted.step3) return;
				currentErrors = validateStep3(formData);
				break;
			default:
				break;
		}

		if (Object.keys(currentErrors).length > 0) {
			setErrors(currentErrors);
			return;
		}

		try {
			let response;
			if (step === 1) {
				response = await post("/api/authors/register/step1", {
					email: formData.email,
					password: formData.password,
					name: formData.name,
				});
			} else if (step === 2) {
				response = await post("/api/authors/register/step2", {
					authorId: formData.authorId,
					businessType: formData.businessType,
					businessName: formData.businessName,
					purpose: formData.purpose,
				});
			} else if (step === 3) {
				response = await post("/api/authors/register/step3", {
					authorId: formData.authorId,
					expertise: formData.expertise,
					teachingExperience: formData.teachingExperience,
					courseTopics: formData.courseTopics,
					});
					
					if (response.success) {
						// Navigate to author dashboard after successful registration
						navigate('/author/dashboard');
						return;
					}
				}
		} catch (error) {
			console.error(error);
		}
	};

	// Updated InputField component
	const InputField = ({ label, name, type = "text", options, ...props }) => (
		<div className="space-y-2">
			<label className="text-sm font-medium text-gray-700 text-left block">{label}</label>
			<div className="relative">
				{type === "select" ? (
					<select
						name={name}
						value={formData[name]}
						onChange={handleChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none transition-colors"
						{...props}
					>
						<option value="">Select {label}</option>
						{options?.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				) : (
					<input
						type={type}
						name={name}
						value={formData[name]}
						onChange={handleChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none transition-colors"
						{...props}
					/>
				)}
				{errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
			</div>
		</div>
	);

	// Updated StepIndicator with better alignment
	const StepIndicator = () => (
		<div className="w-full mb-8 px-4">
			<div className="relative flex items-center justify-between mb-2">
				<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-1"></div>
				{[1, 2, 3].map((num) => (
					<div key={num} className="relative">
						<div
							className={`
              w-10 h-10 rounded-full flex items-center justify-center z-10
              ${
					step >= num
						? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
						: "bg-white border border-gray-300 text-gray-400"
				}
            `}
						>
							{stepsCompleted[`step${num}`] ? "✓" : num}
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-between px-1">
				{[1, 2, 3].map((num) => (
					<p key={num} className="text-xs font-medium text-gray-600 text-center w-20">
						{num === 1 ? "Account" : num === 2 ? "Business" : "Course"}
					</p>
				))}
			</div>
		</div>
	);

	const DynamicContent = () => {
		const contents = {
			1: {
				title: "Start Your Teaching Journey",
				description: "Join thousands of educators making a difference",
				features: [
					{ icon: "👨‍🏫", title: "Expert Community", desc: "Connect with fellow educators" },
					{ icon: "📊", title: "Analytics Dashboard", desc: "Track your progress" },
					{ icon: "🎯", title: "Targeted Reach", desc: "Find your ideal students" },
				],
				image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f93d412349e801238d46a2b167695c43.png?auto=format%2Ccompress&dpr=1",
			},
			2: {
				title: "Build Your Education Business",
				description: "Create a strong foundation for your courses",
				features: [
					{ icon: "💼", title: "Business Tools", desc: "Professional management suite" },
					{ icon: "📈", title: "Growth Metrics", desc: "Track your business progress" },
					{ icon: "🤝", title: "Partner Network", desc: "Collaborate with others" },
				],
				image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f93d412349e801238d46a2b167695c43.png?auto=format%2Ccompress&dpr=1",
			},
			3: {
				title: "Ready to Launch",
				description: "Final steps to start your teaching journey",
				features: [
					{ icon: "🚀", title: "Quick Launch", desc: "Go live in minutes" },
					{ icon: "🎓", title: "Course Builder", desc: "Easy content creation" },
					{ icon: "💡", title: "Smart Features", desc: "AI-powered tools" },
				],
				image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/f93d412349e801238d46a2b167695c43.png?auto=format%2Ccompress&dpr=1",
			},
		};

		const currentContent = contents[step];

		return (
			<div className="space-y-8">
				<h2 className="text-4xl font-bold text-gray-800">{currentContent.title}</h2>
				<p className="text-xl text-gray-600">{currentContent.description}</p>

				<div className="grid gap-6">
					{currentContent.features.map((feature, idx) => (
						<div key={idx} className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg shadow-sm">
							<span className="text-3xl">{feature.icon}</span>
							<div>
								<h3 className="font-semibold text-gray-800">{feature.title}</h3>
								<p className="text-gray-600">{feature.desc}</p>
							</div>
						</div>
					))}
				</div>

				{/* <img
          src={currentContent.image}
          alt="Step illustration"
          className="mt-8 rounded-lg shadow-lg w-full"
        /> */}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="flex flex-col lg:flex-row">
				{/* Registration Form */}
				<div className="w-full lg:w-1/3 bg-white p-4 sm:p-8 min-h-[calc(100vh-64px)] border-r">
					<div className="max-w-md mx-auto">
						<div className="mb-8 text-left">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
							<p className="text-gray-600">Join our community of educators</p>
						</div>

						<StepIndicator />

						<form onSubmit={handleSubmit} className="space-y-6">
							{step === 1 && (
								<>
									<div className="space-y-4">
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-700">Email</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
												placeholder="you@example.com"
											/>
											{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-700">Password</label>
											<input
												type="password"
												name="password"
												value={formData.password}
												onChange={handleChange}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
												placeholder="••••••••"
											/>
											{errors.password && (
												<p className="text-red-500 text-sm">{errors.password}</p>
											)}
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium text-gray-700">Full name</label>
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleChange}
												className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
												placeholder="John Doe"
											/>
											{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
										</div>
									</div>

									<div className="relative my-6">
										<div className="absolute inset-0 flex items-center">
											<div className="w-full border-t border-gray-200"></div>
										</div>
										<div className="relative flex justify-center text-sm">
											<span className="px-2 bg-white text-gray-500">Or continue with</span>
										</div>
									</div>

									<div className=" flex flex-row gap-3">
										<button
											type="button"
											className="w-1/2 flex items-center justify-center px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
										>
											<FaGoogle className="mr-2 text-red-500" /> Continue with Google
										</button>
										<button
											type="button"
											className="w-1/2 flex items-center justify-center px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
										>
											<img src="/microsoft-icon.png" alt="" className="w-5 h-5 mr-2" />
											Continue with Microsoft
										</button>
									</div>
								</>
							)}

							{/* Simplified Step 2 */}
							{step === 2 && (
								<div className="space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Business Type</label>
										<select
											name="businessType"
											value={formData.businessType}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
										>
											<option value="">Select business type</option>
											<option value="individual">Individual</option>
											<option value="business">Business</option>
											<option value="institution">Institution</option>
										</select>
										{errors.businessType && (
											<p className="text-red-500 text-sm">{errors.businessType}</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Business Name</label>
										<input
											type="text"
											name="businessName"
											value={formData.businessName}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
											placeholder="Enter business name"
										/>
										{errors.businessName && (
											<p className="text-red-500 text-sm">{errors.businessName}</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Business Purpose</label>
										<input
											type="text"
											name="purpose"
											value={formData.purpose}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
											placeholder="Enter business purpose"
										/>
										{errors.purpose && (
											<p className="text-red-500 text-sm">{errors.purpose}</p>
										)}
									</div>
								</div>
							)}

							{/* Simplified Step 3 */}
							{step === 3 && (
								<div className="space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Areas of Expertise</label>
										<input
											type="text"
											name="expertise"
											value={formData.expertise}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
											placeholder="e.g., Web Development, Design (comma-separated)"
										/>
										{errors.expertise && (
											<p className="text-red-500 text-sm">{errors.expertise}</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Teaching Experience</label>
										<input
											type="text"
											name="teachingExperience"
											value={formData.teachingExperience}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
											placeholder="Years of experience"
										/>
										{errors.teachingExperience && (
											<p className="text-red-500 text-sm">{errors.teachingExperience}</p>
										)}
									</div>

									<div className="space-y-2">
										<label className="text-sm font-medium text-gray-700">Course Topics</label>
										<input
											type="text"
											name="courseTopics"
											value={formData.courseTopics}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-400 outline-none"
											placeholder="e.g., JavaScript, React (comma-separated)"
										/>
										{errors.courseTopics && (
											<p className="text-red-500 text-sm">{errors.courseTopics}</p>
										)}
									</div>
								</div>
							)}

							<div className="flex justify-between items-center pt-2">
								{step > 1 && (
									<button
										type="button"
										onClick={() => setStep(step - 1)}
										className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
									>
										<FaArrowLeft className="mr-2" /> Back
									</button>
								)}
								<button
									type="submit"
									className={`flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all ${
										step === 1 ? "w-full" : ""
									}`}
								>
									{step === 3 ? "Complete Setup" : "Continue"} <FaArrowRight className="ml-2" />
								</button>
							</div>
						</form>
					</div>
				</div>

				{/* Content Section - Hidden on mobile */}
				<div className="hidden lg:block lg:w-2/3 bg-green-50 p-12">
					<div className="max-w-3xl mx-auto">
						<DynamicContent />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
