import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./apis/index.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

ViteExpress.listen(app, process.env.PORT || 3000, () =>
	console.log("Server is listening on port 3000...")
);
