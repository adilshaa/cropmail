import React, { useState, useEffect } from "react";
import { FaMoon, FaBell, FaClock, FaEnvelope, FaSignature, FaSave, FaLayerGroup } from "react-icons/fa";

const Settings = () => {
	const [settings, setSettings] = useState({
		darkMode: false,
		emailRefreshInterval: 5,
		notificationsEnabled: true,
		signatureEnabled: false,
		signature: "",
		defaultMailView: "comfortable",
		autoSaveEnabled: true,
	});

	useEffect(() => {
		const savedSettings = localStorage.getItem("mailSettings");
		if (savedSettings) {
			setSettings(JSON.parse(savedSettings));
		}
	}, []);

	const handleSettingChange = (setting, value) => {
		const newSettings = { ...settings, [setting]: value };
		setSettings(newSettings);
		localStorage.setItem("mailSettings", JSON.stringify(newSettings));
	};

	return (
		<div className="h-full bg-slate-50/50  p-6">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-2xl font-bold text-gray-800 mb-8">Settings</h1>

				<div className="grid gap-6">
					{/* Appearance Settings */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
										<FaMoon />
									</div>
									<div>
										<h3 className="font-medium text-gray-800">Dark Mode</h3>
										<p className="text-sm text-gray-500">Adjust the appearance of the app</p>
									</div>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={settings.darkMode}
										onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
					</div>

					{/* Notification Settings */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-yellow-50 text-yellow-500 rounded-xl">
										<FaBell />
									</div>
									<div>
										<h3 className="font-medium text-gray-800">Email Notifications</h3>
										<p className="text-sm text-gray-500">Get notified about new emails</p>
									</div>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={settings.notificationsEnabled}
										onChange={(e) => handleSettingChange("notificationsEnabled", e.target.checked)}
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
										<FaClock />
									</div>
									<div>
										<h3 className="font-medium text-gray-800">Refresh Interval</h3>
										<p className="text-sm text-gray-500">How often to check for new emails</p>
									</div>
								</div>
								<select
									value={settings.emailRefreshInterval}
									onChange={(e) =>
										handleSettingChange("emailRefreshInterval", Number(e.target.value))
									}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
								>
									<option value={1}>Every minute</option>
									<option value={5}>Every 5 minutes</option>
									<option value={15}>Every 15 minutes</option>
									<option value={30}>Every 30 minutes</option>
								</select>
							</div>
						</div>
					</div>

					{/* Email Settings */}
					<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-semibold text-gray-800">Email Preferences</h2>
						</div>
						<div className="space-y-4">
							{/* View Settings */}
							<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-green-50 text-green-500 rounded-xl">
										<FaLayerGroup />
									</div>
									<div>
										<h3 className="font-medium text-gray-800">Default View</h3>
										<p className="text-sm text-gray-500">Choose your preferred email view</p>
									</div>
								</div>
								<select
									value={settings.defaultMailView}
									onChange={(e) => handleSettingChange("defaultMailView", e.target.value)}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
								>
									<option value="compact">Compact</option>
									<option value="comfortable">Comfortable</option>
								</select>
							</div>

							{/* Signature Settings */}
							<div className="space-y-4">
								<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
									<div className="flex items-center gap-3">
										<div className="p-3 bg-red-50 text-red-500 rounded-xl">
											<FaSignature />
										</div>
										<div>
											<h3 className="font-medium text-gray-800">Email Signature</h3>
											<p className="text-sm text-gray-500">Add a personal touch to your emails</p>
										</div>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											checked={settings.signatureEnabled}
											onChange={(e) => handleSettingChange("signatureEnabled", e.target.checked)}
										/>
										<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
									</label>
								</div>
								{settings.signatureEnabled && (
									<div className="px-4">
										<textarea
											value={settings.signature}
											onChange={(e) => handleSettingChange("signature", e.target.value)}
											className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
											rows={3}
											placeholder="Enter your signature..."
										/>
									</div>
								)}
							</div>

							{/* Auto-save Settings */}
							<div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
								<div className="flex items-center gap-3">
									<div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
										<FaSave />
									</div>
									<div>
										<h3 className="font-medium text-gray-800">Auto-save Drafts</h3>
										<p className="text-sm text-gray-500">Automatically save email drafts</p>
									</div>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={settings.autoSaveEnabled}
										onChange={(e) => handleSettingChange("autoSaveEnabled", e.target.checked)}
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
