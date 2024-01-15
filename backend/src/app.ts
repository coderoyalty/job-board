import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import BaseController from "./controllers/base.controller";
import errorMiddleWare from "./middlewares/error.middleware";
import swaggerUI from "swagger-ui-express";
import config from "./utils/config";
import { customLog } from "./utils/custom.log";
import { convertForComponents, convertForPaths } from "./utils/doc";

export default class App {
	static endpoints: string[] = [];

	private static instance: App | null = null;
	private _app: Express;
	private port: number;

	public get app() {
		return this._app;
	}

	private set app(v: Express) {
		this._app = v;
	}

	constructor() {
		this._app = express();
		this.initMiddleware();
		this.port = config.PORT;
	}

	injectController(controller: BaseController) {
		let endpoint = controller.endpoint;
		if (endpoint.length > 0 && endpoint[0] === "/") {
			endpoint = endpoint.slice(1);
		}
		if (endpoint.length > 0 && endpoint.at(-1) === "/") {
			endpoint = endpoint.slice(0, -1);
		}

		//TODO: actual controller registration here!
		if (endpoint.length === 0) {
			this.app.use("/api/", controller.router);
		} else {
			this.app.use(`/api/${endpoint}`, controller.router);
		}
	}

	private initMiddleware() {
		this.app.use(
			cors({
				origin: "*",
				credentials: true,
			}),
		);
		this.app.use(cookieParser(config.COOKIE_SECRET));
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(
			express.urlencoded({
				extended: false,
			}),
		);

		this.initSwaggerDoc();
	}

	static getInstance() {
		if (!this.instance) {
			customLog(`Application: ✅ created`);
			this.instance = new App();
		}
		return this.instance;
	}

	private initErrHandler() {
		this.app.use(errorMiddleWare);
	}

	private initSwaggerDoc() {
		const paths = convertForPaths("v1");
		const components = convertForComponents("v1");

		const swaggerDoc = {
			openapi: "3.0.0",
			info: {
				title: "Your Project API",
				version: "1.0.0",
				description: "RESTful API for your project",
			},
			paths,
			components,
		};

		this.app.get("/", (req, res) => {
			res.send(
				'<p style="font-size: 36px;">API: <a href="/api/docs">Documentation</a></p>',
			);
		});

		this.app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
	}

	public run() {
		this.initErrHandler();

		const server = this.app.listen(this.port, () => {
			const time = new Date().toISOString();
			customLog(
				`[⚡] server started: ${time} => http://localhost:${this.port}/`,
			);
			customLog("Registered endpoints:");
			for (let endpoint of App.endpoints) {
				customLog("\t" + endpoint);
			}
		});

		return server;
	}
}
