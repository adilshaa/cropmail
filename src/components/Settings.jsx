import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	Switch,
	FormControl,
	Select,
	MenuItem,
	FormGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";

export const Settings = () => {
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
		<Container maxWidth="md">
			<Box sx={{ py: 4 }}>
				<Typography variant="h4" gutterBottom>
					Settings
				</Typography>

				<FormGroup sx={{ gap: 2 }}>
					<FormControlLabel
						control={
							<Switch
								checked={settings.darkMode}
								onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
							/>
						}
						label="Dark Mode"
					/>

					<FormControlLabel
						control={
							<Switch
								checked={settings.notificationsEnabled}
								onChange={(e) => handleSettingChange("notificationsEnabled", e.target.checked)}
							/>
						}
						label="Enable Notifications"
					/>

					<FormControl>
						<Typography gutterBottom>Email Refresh Interval (minutes)</Typography>
						<Select
							value={settings.emailRefreshInterval}
							onChange={(e) => handleSettingChange("emailRefreshInterval", e.target.value)}
							sx={{ minWidth: 200 }}
						>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={15}>15</MenuItem>
							<MenuItem value={30}>30</MenuItem>
						</Select>
					</FormControl>

					<FormControl>
						<Typography gutterBottom>Default Mail View</Typography>
						<Select
							value={settings.defaultMailView}
							onChange={(e) => handleSettingChange("defaultMailView", e.target.value)}
							sx={{ minWidth: 200 }}
						>
							<MenuItem value="compact">Compact</MenuItem>
							<MenuItem value="comfortable">Comfortable</MenuItem>
						</Select>
					</FormControl>

					<FormControlLabel
						control={
							<Switch
								checked={settings.signatureEnabled}
								onChange={(e) => handleSettingChange("signatureEnabled", e.target.checked)}
							/>
						}
						label="Enable Email Signature"
					/>

					{settings.signatureEnabled && (
						<FormControl>
							<Typography gutterBottom>Email Signature</Typography>
							<TextField
								multiline
								rows={3}
								value={settings.signature}
								onChange={(e) => handleSettingChange("signature", e.target.value)}
							/>
						</FormControl>
					)}

					<FormControlLabel
						control={
							<Switch
								checked={settings.autoSaveEnabled}
								onChange={(e) => handleSettingChange("autoSaveEnabled", e.target.checked)}
							/>
						}
						label="Auto-save Drafts"
					/>
				</FormGroup>
			</Box>
		</Container>
	);
};
