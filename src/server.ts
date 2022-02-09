// Use .env file as environment configuration
import dotenv from "dotenv";
dotenv.config();

import { Logger } from "./utils/logger";

import app from "./app";
import { mongoDbConnection } from "./core/mongoDbFunctions";

const run = async () => {
  const logger = Logger.getLogger();

  await mongoDbConnection();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Running -> Listening on port ${PORT}`);
  });
};

run();
