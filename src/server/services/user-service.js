import UserModel from "../models/user.js";
import Crypto from "./encryption-service.js";
import Db from "../models/db.js";

class User {
	constructor(userInfo) {
		this.info = { ...userInfo };
	}

	/** Saves the user */
	async save() {
		try {
			await Db.connect();
			return await UserModel.create(this.info);
		} catch (error) {
			throw error;
		}
	}

	/** Checks if a user exists */
	static async exists(email) {
		try {
			let user;

			await Db.connect();

			user = await UserModel.findOne({ email });

			return user || false;
		} catch (error) {
			return false;
		}
	}

	/** Verify credentials */
	static async verifyCredentials({ email, password }) {
		try {
			const user = this.exists(email);

			if (!user) return { status: false, reason: "USER_NOT_FOUND" };

			const { password: correctPassword } = user;
			const isPasswordCorrect = await Crypto.compare(
				password,
				correctPassword
			);

			return {
				status: isPasswordCorrect,
				reason: isPasswordCorrect ? undefined : "INCORRECT_PASSWORD"
			};
		} catch (error) {
			return { status: false, reason: "SERVER_ERROR" };
		}
	}

	/** Deletes a user's account */
	static async deleteUser(email) {
		try {
			await Db.connect();

			return (await User.findOneAndDelete({ email })) || false;
		} catch (error) {
			return false;
		}
	}
}

export default User;
