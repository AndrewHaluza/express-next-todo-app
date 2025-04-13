"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.initDB = initDB;
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const logger_1 = __importDefault(require("../shared/utils/logger"));
const DROP_DB_ON_START = process.env.DROP_DB_ON_START === "true";
const { host, port, username, password, database, dialect } = db_1.dbConfig;
const sequelize = new sequelize_1.Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${database}`, {
    logging: (query, executionTime) => logger_1.default.debug({ query, executionTime }),
});
exports.sequelize = sequelize;
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info("Connecting to the database...");
            yield sequelize.authenticate({ logging: true });
            logger_1.default.info("Connection has been established successfully.");
            // Use `force: true` to drop and recreate the table
            yield sequelize.sync({ force: DROP_DB_ON_START });
        }
        catch (error) {
            logger_1.default.error("Unable to connect to the database:", error);
            throw error;
        }
    });
}
