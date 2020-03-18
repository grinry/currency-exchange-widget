import { config } from 'dotenv-safe';
import { join, dirname } from 'path';

const cwd = join(dirname(__filename), '../');
config({ path: join(cwd, '.env'), sample: join(cwd, '.env.example') });

export const cacheTTL = Number(process.env.CACHE_TTL);
export const supportedCurrencies = process.env.CURRENCIES.split(',').map(item => item.toUpperCase());
export const exchangeApiUri = process.env.EXCHANGE_API;
