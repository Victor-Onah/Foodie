import { toast } from "react-toastify";

const handleSignIn = async form => {
	try {
		if (!window.navigator.onLine)
			return toast.warn(
				"We can't complete your request now because you're currently offline"
			);

		const response = await fetch("/api/public/sign-in", {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.text();

		if (response.ok) {
			window.location.assign("/feed");
		} else {
			if (response.status === 400)
				return toast.error(
					"We couldn't validate your request. Please check your inputs and try again."
				);

			if (response.status === 500)
				return toast.error(
					"An error ocurred on our end and we are working to solve it."
				);

			if (data === "USER_NOT_FOUND")
				return toast.error(
					"We couldn't find an your account. sign up instead."
				);
			else if (data === "WRONG_CREDENTIALS")
				return toast.warn(
					"Wrong email or password. Check your inputs and try again."
				);
			else if (data === "ACCOUNT_INACTIVE")
				return toast.error(
					"You have not yet verified your account. Check your email for an verification email"
				);
		}
	} catch (error) {
		toast.error("An unknown error ocurred.");
	}
};

export default handleSignIn;
