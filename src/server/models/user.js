import { Schema } from "mongoose";
import Db from "./db.js";
import Crypto from "../services/encryption-service.js";

const fullNameRegexp =
	/^[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]+(\s*[a-zA-ZàáâäãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿýçćčñńßśšžźżÀÁÂÄÃÅĀÈÉÊËĒĖĘÎÏÍĪĮÌÔÖÒÓŒØŌÕÛÜÙÚŪŸÝÇĆČÑŃßŚŠŽŹŻ'-]*)+$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegexp = /^[^<>.]{6,32}$/;

const userSchema = new Schema({
	id: {
		type: String,
		default: Crypto.uuid()
	},
	name: {
		type: String,
		required: true,
		validate: {
			validator(value) {
				return fullNameRegexp.test(value);
			}
		}
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator(value) {
				return emailRegexp.test(value);
			}
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator(value) {
				return passwordRegexp.test(value);
			}
		}
	},
	thumbnailUrl: String,
	favorites: {
		type: Object,
		default: {
			foods: [String],
			restaurants: [String]
		}
	},
	restaurants: {
		type: [String],
		default: []
	},
	lastLoginDevice: String,
	ipAddresses: {
		type: [String],
		default: []
	},
	currentIpAddress: String,
	currentAddress: String,
	addresses: {
		type: [String],
		default: []
	},
	verified: {
		type: Boolean,
		default: false
	}
});

userSchema.pre("save", async function (next) {
	this.password = await Crypto.hash(this.password);

	next();
});

const User = Db.db.model("User", userSchema);

export default User;
