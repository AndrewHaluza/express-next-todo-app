"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Load environment variables from .env
exports.default = {
    development: {
        host: process.env.APP_DB_HOST || "localhost",
        port: Number(process.env.APP_DB_PORT) || 5432,
        username: process.env.APP_DB_USER || "postgres",
        password: process.env.APP_DB_PASSWORD || "postgres",
        database: process.env.APP_DB_DATABASE || "todo-app",
        dialect: process.env.APP_DB_DIALECT || "postgres",
    },
    test: {
        host: process.env.APP_DB_HOST || "localhost",
        port: Number(process.env.APP_DB_PORT) || 5432,
        username: process.env.APP_DB_USER || "postgres",
        password: process.env.APP_DB_PASSWORD || "postgres",
        database: "todo-app-testing",
        dialect: process.env.APP_DB_DIALECT || "postgres",
    },
};
