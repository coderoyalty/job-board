import { Role } from "@/models/user";
import express from "express";

interface AuthRequest extends express.Request {
	user?: { id: string; email: string; role: Role };
}
export default AuthRequest;
