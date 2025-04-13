"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const logger_1 = __importDefault(require("./shared/utils/logger"));
const port = process.env.APP_PORT || "9090";
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, cors_1.default)({ origin: "*" }));
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(router_1.router);
app.listen(port, () => {
    logger_1.default.info(`The server is running at http://localhost:${port}`);
});
const getApp = () => app;
exports.getApp = getApp;
