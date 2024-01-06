import "module-alias/register";
import "@/controllers";
import dotenv from "dotenv";
dotenv.config();
import App from "@/app";
import supertest from "supertest";
import BaseController from "@/controllers/base.controller";
import { Get } from "@/utils/route.decorator";
import connectDB from "@/utils/database";
import { Connection } from "mongoose";
import Controller from "@/utils/controller.decorator";

const generateHex24 = () => {
	const chars = "abcdef0123456789";

	let str = "";

	for (let i = 0; i < 24; i++) {
		const randomIdx = Math.floor(Math.random() * chars.length);
		str += chars.charAt(randomIdx);
	}

	return str;
};

@Controller()
class ExampleController extends BaseController {
	constructor() {
		super("/test");
	}

	@Get("/")
	async get(req: any, res: any) {
		return res.send("Hello Test!");
	}
}

describe("AuthController, UserController, ExampleController", () => {
	let app: App;
	let connection: Connection;

	beforeAll(async () => {
		connection = await connectDB();
	});

	beforeEach(() => {
		app = App.getInstance();
	});

	it("should handle GET request and respond with 'Hello Test!'", async () => {
		const request = supertest(app.app);

		const response = await request.get(`/api/test`);

		expect(response.text).toBe("Hello Test!");
		expect(response.status).toBe(200);
	});

	it("should handle GET request and respond with 404", async () => {
		const request = supertest(app.app);

		const response = await request.get(`/api/users/${generateHex24()}`);

		expect(response.status).toBe(404);
	});

	it("should handle POST request and respond with 201", async () => {
		const request = supertest(app.app);

		const data = {
			email: "codecode.com", // invalid email address
			password: "CodeCap2024",
			role: "employer",
		};

		const response = await request
			.post(`/api/auth/register`)
			.send(data)
			.set("Accept", "application/json");

		expect(response.status).toBe(400);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		connection.close();
	});
});
