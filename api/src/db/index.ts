import { Sequelize } from "sequelize";
import { env } from "../config/index";
import { logger } from "../app";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: "postgres",
    logging: false,
    pool: {
      max: Number(env.DB_POOL_MAX),
      min: 0,
      idle: 10000
    }
  }
);

export async function connectDB() {
  await sequelize.authenticate();
  logger.info("DB connected");
}

export async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
}
