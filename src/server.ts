import express, {Application, Request, Response} from "express";
import bodyParser from 'body-parser';

import {RequestPayload, ResponsePayload} from './types/payload';
import {validateRequestPayload} from './validation/payload'

import { mongoDbQueryDataByDateAndTotalCount } from "./mongodb/functions";

import dotenv from "dotenv";
dotenv.config()

const app: Application = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/fetchByDateAndTotalCount", async(req: Request, res: Response) => {
  try {
    let requestPayload: RequestPayload = req.body;

    const validation = validateRequestPayload(requestPayload);
    if(!validation.valid) {
      let responsePayload: ResponsePayload = {code: 1, message: validation.message};
      res.status(400).send(responsePayload);
      return null;
    } 

    if(requestPayload.maxCount < requestPayload.minCount) {
      let responsePayload: ResponsePayload = {code: 2, message: "The maxCount must be greater then the minCount."};
      res.status(400).send(responsePayload);
      return null;
    }

    const records = await mongoDbQueryDataByDateAndTotalCount(requestPayload.startDate, requestPayload.endDate, requestPayload.maxCount, requestPayload.minCount);

    let responsePayload = {code: 0, message: "Success", records: records};
    res.status(200).send(responsePayload);

  } catch (error) {
    console.log(error);
    let responsePayload: ResponsePayload = {code: 500, message: "Internal Server Error"};
    res.status(500).send(responsePayload);
  }
});

app.all("*", (req: Request, res: Response) => {
  const responsePayload: ResponsePayload = {code: 404, message: "Route not found."}
  res.status(404).send(responsePayload);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});