import express, { Request, Response } from "express";
import { codeNotFound, codeNotFoundMessage } from "../config/statusConstants";
import { ResponsePayload } from "../types/payload";

const router = express.Router();

// Reply with 404 - Not Found to all requests
router.all("*", async (req: Request, res: Response) => {
  const responsePayload: ResponsePayload = {
    code: codeNotFound,
    msg: codeNotFoundMessage,
  };
  res.status(codeNotFound).send(responsePayload);
});

module.exports = router;
