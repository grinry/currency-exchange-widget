import { Request, Response, NextFunction } from 'express';
import { exchange } from '../services/exchange.service';

/**
 * @param req
 * @param res
 * @param next
 */
export async function exchangeAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { base_currency, quote_currency, base_amount } = req.query;
        const result = await exchange.calculate(base_currency, quote_currency, base_amount);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}
