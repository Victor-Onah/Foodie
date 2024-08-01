import { readFile } from "fs/promises";
import { join } from "path";

const getVerificationEmailTemplate = async () => {
	return await readFile(
		join(process.cwd(), "/src/server/templates/email-verification.html"),
		"utf-8"
	);
};

export default getVerificationEmailTemplate;
