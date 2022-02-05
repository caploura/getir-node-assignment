// Use .env file as environment configuration
import dotenv from "dotenv";
dotenv.config()

import app from "./app";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});