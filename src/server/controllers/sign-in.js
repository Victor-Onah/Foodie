import Crypto from "../services/encryption-service.js";
import MailingService from "../services/mailing-service.js";
import User from "../services/user-service.js";

const signInController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.exists(email);

		if (!user) return res.status(404).end("USER_NOT_FOUND");
		else {
			const { password: savedPassword } = user;
			const isPasswordCorrect = await Crypto.compare(
				password,
				savedPassword
			);

			if (!isPasswordCorrect)
				return res.status(401).end("WRONG_CREDENTIALS");

			if (!user.verified)
				return (
					await MailingService.sendVerificationEmail({
						email,
						name: user.name
					}),
					res.status(401).end("ACCOUNT_INACTIVE")
				);

			const authToken = Crypto.encrypt(
				JSON.stringify({ email, timeStamp: Date.now() })
			);
			const threeDays = 1000 * 60 * 60 * 24 * 3;

			res.cookie("auth_token", authToken, {
				maxAge: threeDays,
				httpOnly: true,
				path: "/",
				secure: true
			});

			res.end("DONE");
		}
	} catch (error) {
		return res.status(500).end(error.message);
	}
};

export default signInController;
