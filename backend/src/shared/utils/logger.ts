import winston from "winston";

const logger = winston.createLogger({
  level: process.env.APP_LOG_LEVEL ?? "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
