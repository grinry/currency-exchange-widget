import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = {};
    errors.array().map(err => {
        if (!extractedErrors.hasOwnProperty(err.param)) {
            extractedErrors[err.param] = [];
        }
        extractedErrors[err.param].push(err.msg);
    });

    return res.status(422).json({
        message: 'Validation error',
        errors: extractedErrors,
    });
};
