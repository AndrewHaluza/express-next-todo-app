import { getApp } from "./app";
import { initDB } from "./db";
import logger from "./shared/utils/logger";

async function initialize() {
  await initDB();

  getApp();
}

process.on("uncaughtException", (err) => {
  logger.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    new Error(`Unhandled Rejection at: ${promise}, reason: ${reason}`)
  );
  process.exit(1);
});

process.on("SIGINT", () => {
  logger.info("SIGINT signal received.");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received.");
  process.exit(0);
});

try {
  initialize();
} catch (error) {
  logger.error("Error during initialization:", error);
}
