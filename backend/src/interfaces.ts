export interface ICache {
    has(key: string): boolean;
    get<T = any>(key: string): T;
    set<T = any>(key: string, value: T, ttl: number): void;
}

type Rates = { [key: string]: number };

export interface IRatesResponse {
    rates: Rates;
    base: string;
    date: string;
}

export interface IRatesClient {
    getRates(base: string): Promise<IRatesResponse>;
}

export interface IExchangeResponse {
    exchange_rate: number;
    quote_amount: number;
}

export interface IExchange {
    calculate(base: string, quote: string, amount: number): Promise<IExchangeResponse>;
}
