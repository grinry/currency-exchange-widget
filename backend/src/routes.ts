import { Router } from 'express';
import { exchangeRequestValidator } from './validators/exchange-request.validator';
import { exchangeAction } from './actions/exchange.action';

export const router = Router();

router.get('/', (req, res) => res.send('OK'));
router.get('/exchange', exchangeRequestValidator, exchangeAction);
