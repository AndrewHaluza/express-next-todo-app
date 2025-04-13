"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    host: process.env.APP_DB_HOST || "localhost",
    port: Number(process.env.APP_DB_PORT) || 5432,
    username: process.env.APP_DB_USER || "postgres",
    password: process.env.APP_DB_PASSWORD || "postgres",
    database: process.env.APP_DB_DATABASE || "todo-app",
    dialect: process.env.APP_DB_DIALECT || "postgres",
};
