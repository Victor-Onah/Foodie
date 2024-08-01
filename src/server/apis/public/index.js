import { Router } from "express";
import signUpController from "../../controllers/sign-up.js";
import accountVerificationController from "../../controllers/verify-account.js";
import signInController from "../../controllers/sign-in.js";

const publicApiRouter = Router();

publicApiRouter.post("/sign-up", signUpController);
publicApiRouter.post("/sign-in", signInController);
publicApiRouter.get("/verify-account/:token", accountVerificationController);

export default publicApiRouter;
