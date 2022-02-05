import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import { RequestPayload, ResponsePayload } from "./types/payload";
import { validateRequestPayload } from "./validation/payload";

import { mongoDbQueryDataByDateAndTotalCount } from "./mongodb/functions";

const app: Application = express();
app.use(bodyParser.json());

// POST /fetchByDateAndTotalCount
app.post("/fetchByDateAndTotalCount", async (req: Request, res: Response) => {
  try {
    let requestPayload: RequestPayload = req.body;

    const validation = validateRequestPayload(requestPayload);
    if (!validation.valid) {
      // Reply with a 400 - Bad Request if the input isn't valid
      let responsePayload: ResponsePayload = {
        code: 1,
        msg: validation.message,
      };
      res.status(400).send(responsePayload);
      return null;
    }

    if (requestPayload.maxCount < requestPayload.minCount) {
      // Reply with a 400 - Bad Request if the received maxCount is greater then the minCount
      let responsePayload: ResponsePayload = {
        code: 2,
        msg: "The maxCount must be greater then the minCount.",
      };
      res.status(400).send(responsePayload);
      return null;
    }

    // Fetch data from MongoDB
    const records = await mongoDbQueryDataByDateAndTotalCount(
      requestPayload.startDate,
      requestPayload.endDate,
      requestPayload.maxCount,
      requestPayload.minCount
    );

    // Send success ResponsePayload
    let responsePayload = {
      code: 0,
      msg: "Success",
      records: records,
    };
    res.status(200).send(responsePayload);
  } catch (error) {
    console.log(error);
    let responsePayload: ResponsePayload = {
      code: 500,
      msg: "Internal Server Error",
    };
    res.status(500).send(responsePayload);
  }
});

// Reply with 404 - Not Found to all requests
app.all("*", (req: Request, res: Response) => {
  const responsePayload: ResponsePayload = {
    code: 404,
    msg: "Route not found.",
  };
  res.status(404).send(responsePayload);
});

export default app;
