import express, { Request, Response } from "express";
import {
  codeInternalError,
  codeInternalErrorMessage,
  codeOK,
  codeSuccess,
  codeSuccessMessage,
} from "../config/statusConstants";

import { fetchByDateAndTotalCount } from "../config/routesConstants";

import { Logger } from "../utils/logger";

import { mongoDbQueryDataByDateAndTotalCount } from "../core/mongoDbFunctions";
import { RequestPayload, ResponsePayload } from "../types/payload";

const router = express.Router();

router.post(fetchByDateAndTotalCount, async (req: Request, res: Response) => {
  const logger = Logger.getLogger();
  try {
    let requestPayload: RequestPayload = req.body;

    // Fetch data from MongoDB
    const records = await mongoDbQueryDataByDateAndTotalCount(
      requestPayload.startDate,
      requestPayload.endDate,
      requestPayload.maxCount,
      requestPayload.minCount
    );

    // Send success ResponsePayload
    let responsePayload: ResponsePayload = {
      code: codeSuccess,
      msg: codeSuccessMessage,
      records: records,
    };

    res.status(codeOK).send(responsePayload);
  } catch (error) {
    logger.error(error);

    let responsePayload: ResponsePayload = {
      code: codeInternalError,
      msg: codeInternalErrorMessage,
    };
    res.status(500).send(responsePayload);
  }
});

module.exports = router;
