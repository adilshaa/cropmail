import React, { useState, useCallback, useEffect } from "react";
import { FaTimes, FaCloudUploadAlt, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { get } from "../../../services/apiService";

const CourseModal = ({ isOpen, onClose, mode = "create", initialData = null }) => {
	const [step, setStep] = useState(1);

	const [courseData, setCourseData] = useState({});

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

	const validateCurrentStep = (stepNum) => {
		let currentErrors = {};
		switch (stepNum) {
			case 1:
				currentErrors = validateStep1();
				break;
			case 2:
				currentErrors = validateStep2();
				break;
			case 3:
				// No validation for step 3
				break;
			default:
				break;
		}
		setErrors(currentErrors);
		return Object.keys(currentErrors).length === 0;
	};

	const handleStepClick = (stepNum) => {
		// Validate current step before allowing navigation
		const isCurrentStepValid = validateCurrentStep(step);

		const previousStepsCompleted = Object.keys(stepsCompleted)
			.filter((key) => parseInt(key.replace("step", "")) < stepNum)
			.every((key) => stepsCompleted[key]);

		if (previousStepsCompleted && (stepNum < step || isCurrentStepValid)) {
			setStep(stepNum);
		} else {
			// Show errors for current step and previous steps
			const newErrors = {};
			for (let i = 1; i <= step; i++) {
				if (!stepsCompleted[`step${i}`]) {
					const stepErrors = i === step ? validateCurrentStep(i) : {};
					Object.assign(newErrors, stepErrors);
				}
			}
			setErrors(newErrors);
		}
	};

	const handleNext = () => {
		const isValid = validateCurrentStep(step);
		if (isValid) {
			setStepsCompleted((prev) => ({ ...prev, [`step${step}`]: true }));
			setStep(step + 1);
		}
	};

	useEffect(() => {
		if (mode === "edit" && initialData) {
			setFormData({
				title: initialData.description.short,
				description: initialData.description.detailed,
				image: initialData.image,
				field: "",
				courseLink: "",
				buttonColor: "teal",
				difficulty: initialData.metadata.difficulty,
			});
			setButtonPreview({
				label: initialData.buttonLabel || "Enroll Now",
				color: initialData.buttonColor || "teal-500",
				hoverColor: `${initialData.buttonColor || "teal"}-600`,
			});
			const fetchCourseDetails = async () => {
				try {
					const response = await get(`/api/courses/${initialData._id}`);
					setCourseData(response);
				} catch (error) {
					console.error("Error fetching course details:", error);
				}
			};
			fetchCourseDetails();
		}
	}, [mode, initialData]);

	const handleSubmit = async () => {
		try {
			const formDataToSubmit = new FormData();
			Object.keys(formData).forEach((key) => {
				if (key === "image" && formData[key] instanceof File) {
					formDataToSubmit.append(key, formData[key]);
				} else {
					formDataToSubmit.append(key, JSON.stringify(formData[key]));
				}
			});

			const endpoint = mode === "edit" ? `/api/courses/${initialData._id}` : "/api/courses";
			const method = mode === "edit" ? "PATCH" : "POST";

			const response = await fetch(endpoint, {
				method,
				body: formDataToSubmit,
			});

			if (response.ok) {
				const result = await response.json();
				// Handle success - maybe refresh the courses list
				onClose();
			} else {
				// Handle error
				console.error("Failed to save course");
			}
		} catch (error) {
			console.error("Error saving course:", error);
		}
	};

	const [buttonPreview, setButtonPreview] = useState({
		label: "Enroll Now",
		color: "teal-500",
		hoverColor: "teal-600",
	});

	const FileUploadCard = () => {
		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop: (acceptedFiles) => {
				const file = acceptedFiles[0];
				if (file) {
					setFormData((prev) => ({
						...prev,
						image: file,
						imagePreview: URL.createObjectURL(file),
					}));
					// Clear error when file is uploaded
					setErrors((prev) => ({ ...prev, image: null }));
				}
			},
			accept: {
				"image/*": [".png", ".jpg", ".jpeg", ".gif"],
			},
			maxSize: 10485760, // 10MB
		});

		return (
			<div
				{...getRootProps()}
				className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragActive ? "border-teal-500 bg-teal-50" : errors.image ? "border-red-500 bg-red-50" : "border-gray-300"}
        `}
			>
				<input {...getInputProps()} />
				<FaCloudUploadAlt className={`mx-auto h-12 w-12 ${errors.image ? "text-red-400" : "text-gray-400"}`} />
				{formData.image ? (
					<div className="mt-2">
						<p className="text-sm text-gray-600">Selected file: {formData.image.name}</p>
						{formData.imagePreview && (
							<img src={formData.imagePreview} alt="Preview" className="mt-2 max-h-32 mx-auto rounded" />
						)}
					</div>
				) : (
					<>
						<p className="mt-2 text-sm text-gray-600">
							{isDragActive ? "Drop your file here" : "Drag & drop or click to select"}
						</p>
						<p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
					</>
				)}
				{errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
			</div>
		);
	};

	const getInputClasses = (fieldName) => `
    w-full px-4 py-3 rounded-lg outline-none transition-colors
    ${errors[fieldName] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-teal-500"}
    border
  `;

	const StepIndicator = () => (
		<div className="relative flex justify-between mb-8">
			{/* Progress line */}
			<div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-200">
				<div
					className="h-full bg-teal-500 transition-all duration-300"
					style={{ width: `${((step - 1) / 2) * 100}%` }}
				/>
			</div>

			{[1, 2, 3].map((num) => (
				<div
					key={num}
					onClick={() => handleStepClick(num)}
					className="relative flex flex-col items-center cursor-pointer z-10"
				>
					<div
						className={`
              w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-300
              ${
					errors[`step${num}`]
						? "bg-red-100 text-red-500 border-2 border-red-500"
						: stepsCompleted[`step${num}`]
						? "bg-teal-500 text-white"
						: "bg-white border-2 border-gray-300 text-gray-500"
				}
            `}
					>
						{errors[`step${num}`] ? (
							<FaExclamationCircle />
						) : stepsCompleted[`step${num}`] ? (
							<FaCheck />
						) : (
							num
						)}
					</div>
					<span className="text-xs mt-1 text-gray-500">
						{num === 1 ? "Details" : num === 2 ? "Settings" : "Summary"}
					</span>
				</div>
			))}
		</div>
	);

	const ButtonPreview = () => (
		<div className="mt-4 p-4 border rounded-lg">
			<h4 className="text-sm font-medium text-gray-700 mb-2">Button Preview</h4>
			<button
				className={`
          px-4 py-2 rounded-lg text-white
          bg-${buttonPreview.color} hover:bg-${buttonPreview.hoverColor}
          transition-colors
        `}
			>
				{buttonPreview.label}
			</button>
		</div>
	);

	const renderStep1 = () => (
		<div className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
				<input
					type="text"
					value={formData.title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					className={getInputClasses("title")}
					placeholder="Enter course title"
				/>
				{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
				<textarea
					value={formData.description}
					onChange={(e) => setFormData({ ...formData, description: e.target.value })}
					className={getInputClasses("description") + " h-32"}
					placeholder="Enter course description"
				/>
				{errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
			</div>

			<FileUploadCard />
		</div>
	);

	const renderStep2 = () => (
		<div className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Course Field</label>
				<input
					type="text"
					value={formData.field}
					onChange={(e) => setFormData({ ...formData, field: e.target.value })}
					className={getInputClasses("field")}
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
					className={getInputClasses("courseLink")}
					placeholder="https://example.com/course"
				/>
				{errors.courseLink && <p className="text-red-500 text-sm mt-1">{errors.courseLink}</p>}
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
				<select
					value={formData.difficulty}
					onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
					className={getInputClasses("difficulty")}
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
								formData.buttonColor === color.value ? "ring-2 ring-offset-2 ring-gray-500" : ""
							}`}
						/>
					))}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Button Label</label>
					<input
						type="text"
						value={buttonPreview.label}
						onChange={(e) =>
							setButtonPreview((prev) => ({
								...prev,
								label: e.target.value,
								color: formData.buttonColor,
							}))
						}
						className={`w-full px-4 py-3 border rounded-lg outline-none
              ${errors.buttonLabel ? "border-red-500" : "border-gray-300"}`}
					/>
				</div>
				<ButtonPreview />
			</div>
		</div>
	);

	const renderStep3 = () => (
		<div className="space-y-6">
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="relative aspect-video bg-gray-100">
					{formData.imagePreview && (
						<img src={formData.imagePreview} alt={formData.title} className="w-full h-full object-cover" />
					)}
				</div>
				<div className="p-6">
					<h2 className="text-2xl font-bold text-gray-900">{formData.title}</h2>
					<p className="mt-2 text-gray-600">{formData.description}</p>

					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<h3 className="text-sm font-medium text-gray-500">Course Details</h3>
							<dl className="mt-2 space-y-2">
								<div>
									<dt className="text-xs text-gray-500">Field</dt>
									<dd className="text-sm text-gray-900">{formData.field}</dd>
								</div>
								<div>
									<dt className="text-xs text-gray-500">Difficulty</dt>
									<dd className="text-sm text-gray-900 capitalize">{formData.difficulty}</dd>
								</div>
								<div>
									<dt className="text-xs text-gray-500">Course Link</dt>
									<dd className="text-sm text-blue-500 truncate">{formData.courseLink}</dd>
								</div>
							</dl>
						</div>
						<div>
							<h3 className="text-sm font-medium text-gray-500">Button Preview</h3>
							<div className="mt-2">
								<button
									className={`
                    px-4 py-2 rounded-lg text-white
                    bg-${buttonPreview.color} hover:bg-${buttonPreview.hoverColor}
                    transition-colors
                  `}
								>
									{buttonPreview.label}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
				<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
					<h2 className="text-xl font-semibold text-gray-800">
						{mode === "edit" ? "Edit Course" : "Create New Course"}
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700">
						<FaTimes size={20} />
					</button>
				</div>

				<div className="p-6 overflow-y-auto">
					<StepIndicator />

					{step === 1 && renderStep1()}
					{step === 2 && renderStep2()}
					{step === 3 && renderStep3()}
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
