import { Request, Response, NextFunction } from "express";
import { RequestPayload, ResponsePayload } from "../types/payload";
import { validateRequestPayload } from "../utils/validatePayloads";

import { Logger } from "../utils/logger";

import { codeBadRequest } from "../config/statusConstants";

export const middlewareValidateRequestPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let requestPayload: RequestPayload = req.body;

  const logger = Logger.getLogger();
  logger.info(
    `Received request for endpoint ${req.method} - ${req.originalUrl}`
  );

  const validation = validateRequestPayload(requestPayload);
  if (!validation.valid) {
    // Reply with a 400 - Bad Request if the input isn't valid
    let responsePayload: ResponsePayload = {
      code: codeBadRequest,
      msg: validation.message,
    };
    res.status(codeBadRequest).send(responsePayload);
  }

  if (requestPayload.maxCount < requestPayload.minCount) {
    // Reply with a 400 - Bad Request if the received maxCount is greater then the minCount
    let responsePayload: ResponsePayload = {
      code: codeBadRequest,
      msg: "The maxCount must be greater then the minCount.",
    };
    res.status(codeBadRequest).send(responsePayload);
  }

  if (!res.headersSent) {
    next();
  }
};
