import { NextFunction, Request, Response } from 'express';
import { ValidationError } from './validation-error';
import { NotFoundError } from './not-found-error';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ValidationError) {
        const errors = {};
        errors[error.key] = [error.message];
        return res.status(422).json({ message: 'Validation error', code: 422, errors }).end();
    } else if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message, code: 404 }).end();
    }
    const error500 = { message: error.message, code: 500, stack: error.stack };
    if (process.env.NODE_ENV === 'production') {
        delete error500.stack;
    }
    console.error(error500);
    return res.status(500).json(error500).end();
}
