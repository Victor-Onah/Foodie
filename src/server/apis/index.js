import { Router } from "express";
import publicApiRouter from "./public/index.js";

const apiRouter = Router();

apiRouter.use("/public", publicApiRouter);

export default apiRouter;
