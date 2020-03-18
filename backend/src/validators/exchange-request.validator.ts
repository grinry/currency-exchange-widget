import { check } from 'express-validator';
import { Request } from 'express-validator/src/base';
import { validate } from './validate';
import { supportedCurrencies } from '../vars';

export const exchangeRequestValidator = [
    check('base_currency')
        .notEmpty().withMessage('Base currency can not be empty.')
        .isIn(supportedCurrencies).withMessage('Selected base currency is invalid.')
        .custom((value, { req }) => notSame(value, req, 'quote_currency')),

    check('quote_currency')
        .notEmpty().withMessage('Quote currency is invalid.')
        .isIn(supportedCurrencies).withMessage('Selected quote currency is invalid.')
        .custom((value, { req }) => notSame(value, req, 'base_currency')),

    check('base_amount')
        .notEmpty().withMessage('Base amount is invalid.')
        .isNumeric({ no_symbols: true }).withMessage('Base amount is invalid.')
        .custom((value, { req }) => {
            if (value <= 0) {
                throw new Error('Base amount must be positive integer');
            }
            return true;
        }),
    validate,
];

const notSame = (value, request: Request, field: string) => {
    if (value == request.query[field]) {
        throw new Error('Base and quote currency can not be same.');
    }
    return true;
};
