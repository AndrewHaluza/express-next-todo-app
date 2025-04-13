"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandlerMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const logger_1 = __importDefault(require("../shared/utils/logger"));
const globalErrorHandlerMiddleware = (error, req, res, next) => {
    var _a;
    if (res.headersSent) {
        next(error);
        return;
    }
    let message = error.message || "Internal Server Error";
    let status = ((_a = error.cause) === null || _a === void 0 ? void 0 : _a.status) || 500;
    logger_1.default.error(error);
    if (error instanceof joi_1.default.ValidationError) {
        status = 400;
        message = `Validation Error: ${error.details
            .map((detail) => detail.message)
            .join(", ")}`;
    }
    const response = {
        status,
        json: { message: message },
    };
    res.status(response.status).send(response.json);
};
exports.globalErrorHandlerMiddleware = globalErrorHandlerMiddleware;
