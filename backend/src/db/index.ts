import { Sequelize } from "sequelize";

import { dbConfig } from "../configs/db";
import logger from "../shared/utils/logger";

const DROP_DB_ON_START = process.env.DROP_DB_ON_START === "true";

const { host, port, username, password, database, dialect } = dbConfig;

const sequelize = new Sequelize(
  `${dialect}://${username}:${password}@${host}:${port}/${database}`
);

async function initDB() {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");

    // Use `force: true` to drop and recreate the table
    await sequelize.sync({ force: DROP_DB_ON_START });
  } catch (error) {
    logger.info("Unable to connect to the database:", error);
  }
}

export { sequelize, initDB };
