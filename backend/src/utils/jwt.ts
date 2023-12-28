import jwt from "jsonwebtoken";

const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRETKEY || "secretphrase");
};

export { verifyToken };
