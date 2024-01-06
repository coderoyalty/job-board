import dotenv from "dotenv";
dotenv.config();

const config = {
	jwt: {
		DURATION: process.env.JWT_DURATION || "1h",
		SECRET: process.env.JWT_SECRETKEY || "jwtsecret",
	},
	COOKIE_SECRET: process.env.COOKIE_SECRET || "cookiesecret",
	db: {
		URI: process.env.DB_URI || "",
		NAME: process.env.DB_NAME || "coderoyalty",
	},
	PORT: (process.env.PORT || 5000) as number,
	enableLogging: process.env.ENV === "dev" ? true : false,
};

export default config;
