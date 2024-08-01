import { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const AccountActivationSuccessModal = () => {
	const [searchParams] = useSearchParams();
	const [activationComplete, setActivationComplete] = useState(
		searchParams.get("activation_complete")
	);

	return (
		activationComplete && (
			<div
				onClick={() => setActivationComplete(false)}
				className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm p-8">
				<div
					onClick={e => e.stopPropagation()}
					className="bg-white min-h-64 w-full max-w-screen-sm p-4 text-center rounded-md flex justify-center items-center flex-col">
					<BiCheckCircle className="text-green-600 text-6xl" />
					<h4 className="text-3xl">Congratulations!</h4>
					<p> Your account has been activated. Continue to login.</p>
					<button
						onClick={e => (
							e.stopPropagation(), setActivationComplete(false)
						)}
						className="h-10 flex items-center p-4 justify-center bg-orange-600 text-sm text-white rounded-sm mt-6">
						Continue
					</button>
				</div>
			</div>
		)
	);
};

export default AccountActivationSuccessModal;
