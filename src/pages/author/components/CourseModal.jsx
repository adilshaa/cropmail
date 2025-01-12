import React, { useState } from "react";
import { FaTimes, FaCloudUploadAlt, FaCheck } from "react-icons/fa";

const CourseModal = ({ isOpen, onClose }) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null,
		field: "",
		courseLink: "",
		buttonColor: "teal",
		difficulty: "beginner",
	});
	const [errors, setErrors] = useState({});
	const [stepsCompleted, setStepsCompleted] = useState({
		step1: false,
		step2: false,
		step3: false,
	});

	const buttonColors = [
		{ value: "teal", class: "bg-teal-500" },
		{ value: "blue", class: "bg-blue-500" },
		{ value: "purple", class: "bg-purple-500" },
		{ value: "red", class: "bg-red-500" },
		{ value: "green", class: "bg-green-500" },
	];

	const difficultyLevels = [
		{ value: "beginner", label: "Beginner" },
		{ value: "intermediate", label: "Intermediate" },
		{ value: "advanced", label: "Advanced" },
	];

	const validateStep1 = () => {
		const errors = {};
		if (!formData.title.trim()) errors.title = "Title is required";
		if (!formData.description.trim()) errors.description = "Description is required";
		if (!formData.image) errors.image = "Course image is required";
		return errors;
	};

	const validateStep2 = () => {
		const errors = {};
		if (!formData.field) errors.field = "Field is required";
		if (!formData.courseLink) errors.courseLink = "Course link is required";
		if (!formData.difficulty) errors.difficulty = "Difficulty level is required";
		return errors;
	};

	const handleNext = () => {
		const currentErrors = step === 1 ? validateStep1() : validateStep2();
		setErrors(currentErrors);

		if (Object.keys(currentErrors).length === 0) {
			setStepsCompleted((prev) => ({ ...prev, [`step${step}`]: true }));
			setStep(step + 1);
		}
	};

	const handleSubmit = () => {
		// Handle form submission
		console.log(formData);
		onClose();
	};

	const StepIndicator = () => (
		<div className="flex justify-between mb-8">
			{[1, 2, 3].map((num) => (
				<div key={num} className="flex flex-col items-center">
					<div
						className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${
				stepsCompleted[`step${num}`]
					? "bg-teal-500 text-white"
					: errors[`step${num}`]
					? "bg-red-100 text-red-500"
					: "bg-gray-100 text-gray-500"
			}
          `}
					>
						{stepsCompleted[`step${num}`] ? <FaCheck /> : num}
					</div>
					<span className="text-xs mt-1 text-gray-500">
						{num === 1 ? "Details" : num === 2 ? "Settings" : "Summary"}
					</span>
				</div>
			))}
		</div>
	);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
				<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-800">Create New Course</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
						<FaTimes size={20} />
					</button>
				</div>

				<div className="p-6 overflow-y-auto">
					<StepIndicator />

					{step === 1 && (
						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
								<input
									type="text"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 outline-none"
									placeholder="Enter course title"
								/>
								{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 outline-none h-32"
									placeholder="Enter course description"
								/>
								{errors.description && (
									<p className="text-red-500 text-sm mt-1">{errors.description}</p>
								)}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Course Image</label>
								<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
									<input
										type="file"
										accept="image/*"
										onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
										className="hidden"
										id="course-image"
									/>
									<label htmlFor="course-image" className="cursor-pointer">
										<FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
										<p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
										<p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
									</label>
								</div>
								{errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
							</div>
						</div>
					)}

					{step === 2 && (
						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Course Field</label>
								<input
									type="text"
									value={formData.field}
									onChange={(e) => setFormData({ ...formData, field: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 outline-none"
									placeholder="e.g., Web Development, Design"
								/>
								{errors.field && <p className="text-red-500 text-sm mt-1">{errors.field}</p>}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Course Link</label>
								<input
									type="url"
									value={formData.courseLink}
									onChange={(e) => setFormData({ ...formData, courseLink: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 outline-none"
									placeholder="https://example.com/course"
								/>
								{errors.courseLink && <p className="text-red-500 text-sm mt-1">{errors.courseLink}</p>}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
								<select
									value={formData.difficulty}
									onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 outline-none"
								>
									<option value="">Select difficulty</option>
									{difficultyLevels.map((level) => (
										<option key={level.value} value={level.value}>
											{level.label}
										</option>
									))}
								</select>
								{errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Button Color</label>
								<div className="flex gap-3">
									{buttonColors.map((color) => (
										<button
											key={color.value}
											type="button"
											onClick={() => setFormData({ ...formData, buttonColor: color.value })}
											className={`w-8 h-8 rounded-full ${color.class} ${
												formData.buttonColor === color.value
													? "ring-2 ring-offset-2 ring-gray-500"
													: ""
											}`}
										/>
									))}
								</div>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="space-y-6">
							<div className="bg-gray-50 rounded-lg p-6">
								<h3 className="text-lg font-medium text-gray-900 mb-4">Course Summary</h3>
								<dl className="space-y-4">
									<div>
										<dt className="text-sm font-medium text-gray-500">Title</dt>
										<dd className="mt-1 text-sm text-gray-900">{formData.title}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">Description</dt>
										<dd className="mt-1 text-sm text-gray-900">{formData.description}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">Field</dt>
										<dd className="mt-1 text-sm text-gray-900">{formData.field}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-gray-500">Difficulty</dt>
										<dd className="mt-1 text-sm text-gray-900">{formData.difficulty}</dd>
									</div>
								</dl>
							</div>
						</div>
					)}
				</div>

				<div className="px-6 py-4 border-t border-gray-200 flex justify-between">
					<button
						onClick={() => step > 1 && setStep(step - 1)}
						className={`px-4 py-2 text-sm font-medium rounded-lg ${
							step === 1 ? "invisible" : "text-gray-600 hover:text-gray-800"
						}`}
					>
						Back
					</button>
					<button
						onClick={step === 3 ? handleSubmit : handleNext}
						className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
					>
						{step === 3 ? "Create Course" : "Next"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseModal;
