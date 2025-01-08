import React, { useState, useEffect, Suspense } from "react"; // Remove useState, useEffect
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing";
import Sent from "../src/pages/Sent";
import Profile from "../src/pages/Profile";
import Billing from "../src/pages/Billing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Register from "./pages/Register";
import Compose from "./pages/Compose";
import Drafts from "./pages/Drafts";

import { GoogleOAuthProvider } from "@react-oauth/google";
import StripeWrapper from "./components/StripeWrapper";
import Payment from "./pages/Payment";
import Pricing from "./pages/Plans";
import Settings from "./components/Settings";
import Schedule from "./components/Schedule";

const clientId = "373314217149-ks6armu585104gmhg10drdk1odl70s3n.apps.googleusercontent.com";

// Add PaymentSuccess component
const PaymentSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Show success message and redirect after 3 seconds
		const timer = setTimeout(() => {
			navigate("/home");
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="text-center p-8 bg-white rounded-xl shadow-lg">
				<div className="text-green-500 text-5xl mb-4">✓</div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
				<p className="text-gray-600">Redirecting to your dashboard...</p>
			</div>
		</div>
	);
};

function App() {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Router>
				<div className="App">
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							{/* Public Routes */}
							<Route path="/login" element={<PublicRoute element={LoginPage} />} />
							<Route path="/register" element={<PublicRoute element={Register} />} />
							<Route path="/" element={<LandingPage />} />
							<Route path="/about" element={<About />} />
							<Route path="/price" element={<Pricing />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="/terms-and-conditions" element={<TermsAndConditions />} />

							{/* Protected Parent Route */}
							<Route path="/home" element={<PrivateRoute element={Home} />}>
								{/* Email Management Routes */}
								<Route index element={<Navigate to="inbox" replace />} />
								<Route path="inbox" element={<Sent />} />
								<Route path="sent" element={<Sent />} />
								<Route path="drafts" element={<Drafts />} />
								<Route path="compose" element={<Compose />} />
								<Route path="schedule" element={<Schedule />} />

								{/* User Management Routes */}
								<Route path="profile" element={<Profile />} />
								<Route path="settings" element={<Settings />} />

								{/* Modified Payment Routes */}
								<Route path="billing" element={<Billing />} />
									<Route
										path="pay"
										element={
												<StripeWrapper>
													<Payment />
												</StripeWrapper>
										}
									/>
								<Route path="payment-success" element={<PaymentSuccess />} />
							</Route>

							{/* Fallback Route */}
							{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
						</Routes>
					</Suspense>
				</div>
			</Router>
		</GoogleOAuthProvider>
	);
}

export default App;
