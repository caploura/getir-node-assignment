// Use .env file as environment configuration
import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { mongoDbConnection } from "./mongodb/functions";

const run = async () => {
  await mongoDbConnection();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Running -> Listening on port ${PORT}`);
  });
};

run();
