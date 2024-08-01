import nodemailer from "nodemailer";
import { config } from "dotenv";
import getVerificationEmailTemplate from "../utils/get-verification-email-template.js";
import Crypto from "./encryption-service.js";

config();

class MailingService {
	static get #transporter() {
		return nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.APP_EMAIL,
				pass: process.env.EMAIL_PASSWORD
			}
		});
	}

	/** Send verification email to User */
	static async sendVerificationEmail({
		email,
		name,
		timeStamp = Date.now()
	}) {
		const encryptedData = await Crypto.encrypt(
			JSON.stringify({ email, timeStamp })
		);
		const verificationLink = `http://localhost:3000/api/public/verify-account/${encryptedData}`;
		const emailTemplate = (await getVerificationEmailTemplate())
			.replace("%USER_NAME%", name.split(" ")[0])
			.replace(/%VERIFICATION_LINK%/g, verificationLink);
		const mailDetails = {
			from: '"Foodie" foodie.com.ng@gmail.com',
			to: email,
			subject: "Account Verification",
			html: emailTemplate
		};

		this.#transporter.sendMail(mailDetails, (error, info) => {
			if (error) {
			}
		});
	}
}

export default MailingService;
