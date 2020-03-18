import { IRatesClient, ICache, IExchange, IExchangeResponse } from '../interfaces';
import { RatesClientService } from './rates-client.service';
import { CacheService } from './cache.service';
import { cacheTTL, supportedCurrencies } from '../vars';
import { multiply, bignumber, floor } from 'mathjs';

type Rates = { [key: string]: number };

export class ExchangeService implements IExchange {
    constructor(private client: IRatesClient, private cache: ICache) {}

    public async calculate(base: string, quote: string, amount: number): Promise<IExchangeResponse> {
        base = base.toUpperCase();
        quote = quote.toUpperCase();
        if (!this.cache.has('base')) {
            await this.retrieveAndCacheRates(base);
        }
        const rates = this.cache.get<Rates>(base);
        return this.exchangeAmount(rates, quote, amount);
    }

    /**
     * Actual calculation of
     * @param rates
     * @param quote
     * @param amount
     */
    private exchangeAmount(rates: Rates, quote: string, amount: number): IExchangeResponse {
        const exchange_rate = Number(rates[quote].toFixed(3));
        const quote_amount = floor(Number(multiply(bignumber(amount), bignumber(exchange_rate))));
        return {
            exchange_rate,
            quote_amount,
        };
    }

    /**
     * Retrieves exchange rates from third party and caches quote currencies we support.
     * @param base
     */
    private async retrieveAndCacheRates(base: string): Promise<void> {
        const response = await this.client.getRates(base);
        const rates: Rates = {};
        for (const currency of supportedCurrencies) {
            rates[currency] = response.rates[currency];
        }
        this.cache.set(base, rates, cacheTTL);
    }
}

export const exchange = new ExchangeService(
    new RatesClientService,
    new CacheService,
);
