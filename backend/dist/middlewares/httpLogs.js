"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogs = httpLogs;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../shared/utils/logger"));
function httpLogs() {
    return (0, morgan_1.default)(":method :url HTTP/:http-version :status :res[content-length] - :response-time ms", {
        stream: {
            write: (message) => logger_1.default.http(message.trim()),
        },
    });
}
