import Crypto from "../services/encryption-service.js";
import User from "../services/user-service.js";

const accountVerificationController = async (req, res) => {
	try {
		const { token } = req.params;
		const { email, timeStamp } = JSON.parse(await Crypto.decrypt(token));
		const user = await User.exists(email);
		const thirtyMinutes = 1000 * 60 * 30;

		// No user exists with email
		if (!user) return res.status(404).end("ACCOUNT_NOT_FOUND");

		// Timestamp has expired
		if (Date.now() - timeStamp > thirtyMinutes)
			return res.status(403).send("LINK_EXPIRED");

		user.verified = true;

		await user.save();

		res.redirect("/sign-in?activation_complete=true");
	} catch (error) {
		console.error(error);
		return res.status(403).send("FORBIDDEN");
	}
};

export default accountVerificationController;
