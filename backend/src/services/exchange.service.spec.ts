import mockAxios from 'axios';
import { ExchangeService } from './exchange.service';
import { RatesClientService } from './rates-client.service';
import { CacheService } from './cache.service';
import { bignumber, floor, multiply } from 'mathjs';

jest.mock('axios');

test('mocked USD conversion EUR', () => {

    const amount = 100;

    const data = {
        data: {
            rates: {
                USD: 1,
                EUR: 2,
            },
            base: 'USD',
            date: '2020-03-18',
        }
    };

    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const exchange = new ExchangeService(
      new RatesClientService,
      new CacheService,
    );

    exchange.calculate('USD', 'EUR', amount).then(response => {
        expect(response.exchange_rate).toBe(data.data.rates.EUR);
        expect(response.quote_amount).toBe(floor(Number(multiply(bignumber(amount), bignumber(data.data.rates.EUR)))));
    });

});
