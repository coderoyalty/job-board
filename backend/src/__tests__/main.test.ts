import "module-alias/register";
import "@/controllers";
import dotenv from "dotenv";
dotenv.config();
import App from "@/app";
import supertest from "supertest";
import connectDB from "@/utils/database";
import { Connection } from "mongoose";

const generateHex24 = () => {
	const chars = "abcdef0123456789";

	let str = "";

	for (let i = 0; i < 24; i++) {
		const randomIdx = Math.floor(Math.random() * chars.length);
		str += chars.charAt(randomIdx);
	}

	return str;
};

describe("AuthController, UserController", () => {
	let app: App;
	let connection: Connection;
	let userInfo: Record<string, any>;

	beforeAll(async () => {
		connection = await connectDB();
		userInfo = {
			email: "code@gmail.com",
			password: generateHex24(),
			role: "employer",
		};
	});

	beforeEach(() => {
		app = App.getInstance();
	});

	it("should handle GET request and respond with 404 for an invalid user id", async () => {
		const request = supertest(app.app);

		const response = await request.get(`/api/users/${generateHex24()}`);

		expect(response.status).toBe(404);
	});

	it("should handle POST request and respond with 400 for an invalid email", async () => {
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

	it("should handle POST request with a 400 response for an invalid role type", async () => {
		const request = supertest(app.app);

		const data = {
			email: "code@code.com", // invalid email address
			password: "CodeCap2024",
			role: "employee", // invalid role, role can be only "employer" or "candidate",
		};

		const response = await request
			.post(`/api/auth/register`)
			.send(data)
			.set("Accept", "application/json");

		expect(response.status).toBe(400);
	});

	it("should successfully register a new account", async () => {
		const request = supertest(app.app);
		const response = await request
			.post(`/api/auth/register`)
			.send(userInfo)
			.set("Accept", "application/json");
		expect(response.status).toBe(201);
	});

	it("should gracefully avoid account duplication", async () => {
		const request = supertest(app.app);
		const response = await request
			.post(`/api/auth/register`)
			.send(userInfo)
			.set("Accept", "application/json");
		expect(response.status).toBe(409);
	});

	it("should restrict an account access when password is incorrect", async () => {
		const request = supertest(app.app);
		const response = await request
			.post(`/api/auth/login`)
			.send({ email: userInfo.email, password: generateHex24() })
			.set("Accept", "application/json");
		expect(response.status).toBe(401);
	});

	it("should grant access when password is correct", async () => {
		const request = supertest(app.app);
		const response = await request
			.post(`/api/auth/login`)
			.send({ email: userInfo.email, password: userInfo.password })
			.set("Accept", "application/json");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("message");
		expect(response.body.message).toBe("Login successfully");
	});

	afterAll(async () => {
		await connection.dropDatabase();
		connection.close();
	});
});
