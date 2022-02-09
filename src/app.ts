import express, { Application } from "express";
import bodyParser from "body-parser";

const mongoDbRoutes = require("./routes/mongoDbRoutes");
const defaultRoutes = require("./routes/default");

import { middlewareValidateRequestPayload } from "./middleware/validatePayload";

const app: Application = express();

// Use JSON body parser
app.use(bodyParser.json());

// Use the request payload validation middleware
app.use(middlewareValidateRequestPayload);

// Add mongoDbRoutes to app
app.use(mongoDbRoutes);

// Add defaultRoutes to app
app.use(defaultRoutes);

export default app;
