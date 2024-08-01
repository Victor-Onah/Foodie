import Crypto from "../services/encryption-service.js";
import MailingService from "../services/mailing-service.js";
import User from "../services/user-service.js";

const signUpController = async (req, res) => {
	try {
		const { email, name, password } = req.body;
		const userExists = await User.exists(email);

		if (userExists) return res.status(409).end("USER_EXISTS");
		else {
			await new User({
				email,
				name,
				password: await Crypto.hash(password)
			}).save();

			await MailingService.sendVerificationEmail({ email, name });

			res.status(201).end("CREATED");
		}
	} catch (error) {
		if (error.message.includes("validation"))
			return res.status(400).end(error.message);
		else return res.status(500).end(error.message);
	}
};

export default signUpController;
