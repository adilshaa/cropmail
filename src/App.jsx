import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { post } from "./services/apiService";
import Pricing from "./pages/Plans";
import Settings from "./components/Settings";
import Schedule from "./components/Schedule";

const stripePromise = loadStripe(
	"pk_test_51QZz8CJiFOOk4zjno8t5Z0TR17DSktasAndTdOfamjjOdAMjGH846nwwBXWZt4y9mgylRfTedw4xQg2Is1gYzOu800400MHx8t"
);

const clientId = "373314217149-ks6armu585104gmhg10drdk1odl70s3n.apps.googleusercontent.com";

function App() {
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// Fetch the client secret from your server
		post("/api/create-payment-intent", { amount: 1000 }) // Example amount
			.then((res) => res)
			.then((data) => setClientSecret(data.clientSecret))
			.catch((error) => console.error("Error fetching client secret:", error));
	}, []);

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
								<Route path="sent" element={<Sent />} />
								<Route path="profile" element={<Profile />} />
								<Route path="billing" element={<Billing />} />
								<Route path="settings" element={<Settings />} />
								<Route path="schedule" element={<Schedule />} />
								{clientSecret && (
									<Route
										path="pay"
										element={
											<Elements stripe={stripePromise} options={{ clientSecret }}>
												<Payment />
											</Elements>
										}
									/>
								)}
							</Route>

							{/* Fallback Route */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</Suspense>
				</div>
			</Router>
		</GoogleOAuthProvider>
	);
}

export default App;
