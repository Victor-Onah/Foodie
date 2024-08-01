import mongoose, { connections } from "mongoose";
import { config } from "dotenv";

config();

class Db {
	/** Get the current database being used */
	static get db() {
		return mongoose.connection.useDb("Foodie");
	}

	/** Connect to database */
	static async connect() {
		try {
			switch (true) {
				case mongoose.connections.length > 1:
					for (let i = 1; i < mongoose.connections.length; i++) {
						await mongoose.connections[i].destroy(true);
					}
				case mongoose.connection.readyState === 1 ||
					mongoose.connection.readyState === 2:
					return mongoose.connection;
				default:
					const devMode = process.env.NODE_ENV === "development";
					const connectionString = devMode
						? "mongodb://localhost:27017"
						: process.env.MONGO_URL;

					return await mongoose.connect(connectionString);
			}
		} catch (error) {
			return false;
		}
	}
}

export default Db;
