import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { SnackbarProvider } from "./contexts/SnackbarContext";

// Components
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import StripeWrapper from "./components/StripeWrapper";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy loaded components
const LazyComponents = {
	LoginPage: lazy(() => import("./pages/Login")),
	Home: lazy(() => import("./pages/Home")),
	LandingPage: lazy(() => import("./pages/Landing")),
	About: lazy(() => import("./pages/About")),
	Courses: lazy(() => import("./pages/Courses")),
	CourseDetails: lazy(() => import("./pages/CourseDetails")),
	Contact: lazy(() => import("./pages/Contact")),
	Register: lazy(() => import("./pages/Register")),
	Plans: lazy(() => import("./pages/Plans")),
	Profile: lazy(() => import("./pages/Profile")),
	Payment: lazy(() => import("./pages/Payment")),
	// MyCourses: lazy(() => import("./pages/MyCourses")),
	PaymentSuccess: lazy(() => import("./components/PaymentSuccess")),
	PrivacyPolicy: lazy(() => import("./components/PrivacyPolicy")),
	TermsAndConditions: lazy(() => import("./components/TermsAndConditions")),
	Settings: lazy(() => import("./components/Settings")),
};

const publicRoutes = [
	{ path: "/login", Component: LazyComponents.LoginPage, isPublic: true },
	{ path: "/register", Component: LazyComponents.Register, isPublic: true },
	{ path: "/", Component: LazyComponents.LandingPage },
	{ path: "/about", Component: LazyComponents.About },
	{ path: "/price", Component: LazyComponents.Plans },

	{ path: "/courses", Component: LazyComponents.Courses },
	{ path: "/course/:id", Component: LazyComponents.CourseDetails },
	{ path: "/contact", Component: LazyComponents.Contact },
	{ path: "/privacy-policy", Component: LazyComponents.PrivacyPolicy },
	{ path: "/terms-and-conditions", Component: LazyComponents.TermsAndConditions },
];

const privateRoutes = [
	// { path: "learning/:courseId", Component: LazyComponents.Learning },
	{ path: "profile", Component: LazyComponents.Profile },
	{ path: "settings", Component: LazyComponents.Settings },
	// { path: "my-courses", Component: LazyComponents.MyCourses },
	{ path: "pay", Component: LazyComponents.Payment, wrapper: StripeWrapper },
	{ path: "payment-success", Component: LazyComponents.PaymentSuccess },
];

const CLIENT_ID = "373314217149-ks6armu585104gmhg10drdk1odl70s3n.apps.googleusercontent.com";

function App() {
	return (
		<GoogleOAuthProvider clientId={CLIENT_ID}>
			<HelmetProvider>
				<SnackbarProvider>
					<BrowserRouter>
						<div className="App">
							<Suspense fallback={<LoadingSpinner />}>
								<Routes>
									{publicRoutes.map(({ path, Component, isPublic }) =>
										isPublic ? (
											<Route
												key={path}
												path={path}
												element={<PublicRoute element={Component} />}
											/>
										) : (
											<Route key={path} path={path} element={<Component />} />
										)
									)}

									<Route path="/home" element={<PrivateRoute element={LazyComponents.Home} />}>
										{privateRoutes.map(({ path, Component, wrapper: Wrapper }) => (
											<Route
												key={path}
												path={path}
												element={
													Wrapper ? (
														<Wrapper>
															<Component />
														</Wrapper>
													) : (
														<Component />
													)
												}
											/>
										))}
									</Route>
								</Routes>
							</Suspense>
						</div>
					</BrowserRouter>
				</SnackbarProvider>
			</HelmetProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
