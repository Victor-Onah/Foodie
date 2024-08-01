import crypto from "crypto";
import { config } from "dotenv";

config();

class Crypto {
	static #algorithm = process.env.ENC_ALGORITHM;
	static #iv = Buffer.from(process.env.IV, "hex");
	static #encKey = Buffer.from(process.env.ENC_KEY, "hex");
	static #hashAlgo = process.env.HASH_ALGORITHM;

	/** Encrypts data */
	static async encrypt(data) {
		if (typeof data !== "string") data = data.toString();

		const cipher = crypto.createCipheriv(
			this.#algorithm,
			this.#encKey,
			this.#iv
		);
		let encryptedData = cipher.update(data, "utf8", "hex");

		encryptedData += cipher.final("hex");

		return encryptedData;
	}

	/** Decrypts encrypted data */
	static async decrypt(encryptedData) {
		if (typeof encryptedData !== "string")
			throw new TypeError(
				`Encrypted data must be of type 'string', received type '${typeof encryptedData}'`
			);

		const decipher = crypto.createDecipheriv(
			this.#algorithm,
			this.#encKey,
			this.#iv
		);
		let decryptedData = decipher.update(encryptedData, "hex", "utf8");

		decryptedData += decipher.final("utf8");

		return decryptedData;
	}

	/**
	 * Hash data
	 * @returns {Promise<string>} The hashed string
	 */
	static async hash(data) {
		return crypto.createHash(this.#hashAlgo).update(data).digest("hex");
	}

	/** Compare data against hash */
	static async compare(data, hash) {
		return (await this.hash(data)) === hash;
	}

	/** Generates a random ID */
	static uuid() {
		return crypto.randomUUID();
	}
}

export default Crypto;
