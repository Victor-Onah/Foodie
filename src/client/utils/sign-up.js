import { toast } from "react-toastify";

const handleSignUp = async form => {
	try {
		if (!window.navigator.onLine)
			return toast.warn(
				"We can't complete your request now because you're currently offline"
			);

		const response = await fetch("/api/public/sign-up", {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.text();

		if (response.ok) {
			window.location.assign("/sign-in?activation_complete=true");
		} else {
			if (response.status === 400)
				return toast.error(
					"We couldn't validate your request. Please check your inputs and try again."
				);

			if (response.status === 500)
				return toast.error(
					"An error ocurred on our end and we are working to solve it."
				);

			if (data === "USER_EXISTS")
				return toast.warn(
					"Seems like you already have an account. Sign in instead."
				);
		}
	} catch (error) {
		toast.error("An unknown error ocurred.");
	}
};

export default handleSignUp;
