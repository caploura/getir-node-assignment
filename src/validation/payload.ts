import { RequestPayload, ResponsePayload } from "../types/payload"
import Joi from 'joi';

export const validateRequestPayload = (p: RequestPayload) => {
    const v = Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        minCount: Joi.number().required(),
        maxCount: Joi.number().required(),
    });

    const validation = v.validate({startDate: p.startDate, endDate: p.endDate, minCount: p.minCount, maxCount: p.maxCount});

    if (validation.error) {
        console.log('RequestPayload validation error: ' + validation.error.details[0].message);
        return {valid: false, message: validation.error.details[0].message};
    } else {
        return {valid: true, message: "Valid"};
    }
}