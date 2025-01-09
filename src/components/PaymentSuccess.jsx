import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/home/my-courses");
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="text-center p-8 bg-white rounded-xl shadow-lg">
				<div className="text-green-500 text-5xl mb-4">✓</div>
				<h2 className="text-2xl font-bold text-gray-800 mb-2">
					Welcome to Your New Course!
				</h2>
				<p className="text-gray-600">
					Redirecting to your learning dashboard...
				</p>
			</div>
		</div>
	);
};

export default PaymentSuccess;
