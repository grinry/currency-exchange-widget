import mockAxios from 'axios';
import { RatesClientService } from './rates-client.service';

jest.mock('axios');

test('get mocked rates from external api', () => {
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

    const client = new RatesClientService();

    return client.getRates('USD').then(response => {
        expect(response).toEqual(data.data);
    });

});
