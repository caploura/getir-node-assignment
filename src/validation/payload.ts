import { RequestPayload, ResponsePayload } from "../types/payload";
import Joi from "joi";

export const validateRequestPayload = (p: RequestPayload) => {
  const v = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required(),
  });

  const validation = v.validate({
    startDate: p.startDate,
    endDate: p.endDate,
    minCount: p.minCount,
    maxCount: p.maxCount,
  });

  if (validation.error) {
    console.log(
      "RequestPayload validation error: " + validation.error.details[0].message
    );
    return { valid: false, message: validation.error.details[0].message };
  } else {
    return { valid: true, message: "Valid" };
  }
};

export const validateResponsePayload = (p: ResponsePayload) => {
  const v = Joi.object({
    code: Joi.number().required(),
    msg: Joi.string().required(),
    records: Joi.number(),
  });

  const validation = v.validate({
    code: p.code,
    msg: p.msg,
    records: p.records,
  });

  if (validation.error) {
    console.log(
      "ResponsePayload validation error: " + validation.error.details[0].message
    );
    return { valid: false, message: validation.error.details[0].message };
  } else {
    return { valid: true, message: "Valid" };
  }
};
