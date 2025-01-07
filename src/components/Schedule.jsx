import React, { useState, useEffect } from "react";
import { get, post } from "../services/apiService";
import EmailInbox from "./EmailInbox";

const Schedule = () => {
	const [schedules, setSchedules] = useState([
        {
            id: 1,
            subject: "Weekly Team Update",
            type: "weekly",
            time: "09:00",
            dayOfWeek: "1",
            recipients: ["team@company.com", "manager@company.com"],
            template: "Hi team,\n\nHere's our weekly update...",
        },
        {
            id: 2,
            subject: "Daily Report Summary",
            type: "daily",
            time: "17:00",
            recipients: ["reports@company.com"],
            template: "Daily report for {date}...",
        },
        {
            id: 3,
            subject: "Monthly Newsletter",
            type: "monthly",
            time: "10:00",
            dayOfMonth: "1",
            recipients: ["subscribers@company.com", "marketing@company.com"],
            template: "Monthly Newsletter - {month} Edition",
        }
    ]);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [formData, setFormData] = useState({
		subject: "",
		type: "daily", // daily, weekly, monthly
		time: "",
		dayOfWeek: "1", // 1-7 for weekly
		dayOfMonth: "1", // 1-31 for monthly
		template: "",
		recipients: [],
	});

	useEffect(() => {
		fetchSchedules();
	}, []);

	const fetchSchedules = async () => {
		try {
			const response = await get("/api/schedules");
			setSchedules(response.data);
		} catch (error) {
			console.error("Error fetching schedules:", error);
		}
	};

	const handleCreateSchedule = async () => {
		try {
			await post("/api/schedules", formData);
			fetchSchedules();
			setShowCreateForm(false);
			setFormData({
				subject: "",
				type: "daily",
				time: "",
				dayOfWeek: "1",
				dayOfMonth: "1",
				template: "",
				recipients: [],
			});
		} catch (error) {
			console.error("Error creating schedule:", error);
		}
	};

	const handleDeleteSchedule = async (id) => {
		try {
			await post(`/api/schedules/${id}/delete`);
			fetchSchedules();
		} catch (error) {
			console.error("Error deleting schedule:", error);
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold">Email Schedules</h1>
				<button
					onClick={() => setShowCreateForm(true)}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
				>
					Create Schedule
				</button>
			</div>

			{/* Schedule List */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Subject
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Type
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Time
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Recipients
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{schedules.map((schedule) => (
							<tr key={schedule.id}>
								<td className="px-6 py-4 whitespace-nowrap">{schedule.subject}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
										{schedule.type}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">{schedule.time}</td>
								<td className="px-6 py-4 whitespace-nowrap">{schedule.recipients.length} recipients</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									<button
										onClick={() => handleDeleteSchedule(schedule.id)}
										className="text-red-600 hover:text-red-900 mr-4"
									>
										Delete
									</button>
									<button className="text-blue-600 hover:text-blue-900">View Template</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Create Schedule Form Modal */}
			{showCreateForm && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
					<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
						<h2 className="text-xl font-semibold mb-4">Create Schedule</h2>
						<div className="space-y-6">
							<div className="form-group">
								<label className="block text-sm font-medium text-gray-700 mb-2">Schedule Type</label>
								<div className="relative">
									<select
										value={formData.type}
										onChange={(e) => setFormData({ ...formData, type: e.target.value })}
										className="appearance-none w-full bg-white border border-gray-300 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
									>
										<option value="daily">Daily Schedule</option>
										<option value="weekly">Weekly Schedule</option>
										<option value="monthly">Monthly Schedule</option>
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
										</svg>
									</div>
								</div>
							</div>

							{formData.type === "weekly" && (
								<div className="form-group">
									<label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
									<div className="relative">
										<select
											value={formData.dayOfWeek}
											onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
											className="appearance-none w-full bg-white border border-gray-300 px-4 py-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										>
											{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
												<option key={index + 1} value={index + 1}>
													{day}
												</option>
											))}
										</select>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
											<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
												<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
											</svg>
										</div>
									</div>
								</div>
							)}

							<div className="form-group">
								<label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
								<div className="relative">
									<input
										type="time"
										value={formData.time}
										onChange={(e) => setFormData({ ...formData, time: e.target.value })}
										className="appearance-none w-full bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
									/>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
								</div>
							</div>

							<EmailInbox
								prompt=""
								onSchedule={(emailData) => {
									setFormData({
										...formData,
										subject: emailData.subject,
										recipients: emailData.recipients,
										template: emailData.template,
									});
								}}
							/>

							<div className="flex justify-end space-x-4 mt-8">
								<button
									onClick={() => setShowCreateForm(false)}
									className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
								>
									Cancel
								</button>
								<button
									onClick={handleCreateSchedule}
									className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
								>
									Create Schedule
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Schedule;
