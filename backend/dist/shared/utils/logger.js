var _a;
import winston from "winston";
var logger = winston.createLogger({
    level: (_a = process.env.APP_LOG_LEVEL) !== null && _a !== void 0 ? _a : "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new winston.transports.Console()],
});
export default logger;
