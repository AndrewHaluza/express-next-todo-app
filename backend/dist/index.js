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
const app_1 = require("./app");
const db_1 = require("./db");
const logger_1 = __importDefault(require("./shared/utils/logger"));
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.initDB)();
        (0, app_1.getApp)();
    });
}
process.on("uncaughtException", (err) => {
    logger_1.default.error(err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    logger_1.default.error(new Error(`Unhandled Rejection at: ${promise}, reason: ${reason}`));
    process.exit(1);
});
process.on("SIGINT", () => {
    logger_1.default.info("SIGINT signal received.");
    process.exit(0);
});
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM signal received.");
    process.exit(0);
});
try {
    initialize();
}
catch (error) {
    logger_1.default.error("Error during initialization:", error);
}
