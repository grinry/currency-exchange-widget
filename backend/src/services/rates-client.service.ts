import Axios, { AxiosInstance } from 'axios';
import { exchangeApiUri } from '../vars';
import { IRatesClient, IRatesResponse } from '../interfaces';

export class RatesClientService implements IRatesClient {
    private client: AxiosInstance;

    constructor() {
        this.client = Axios.create({
            baseURL: exchangeApiUri,
            headers: {
                'content-type': 'application/json',
                'accept': 'json',
            }
        })
    }

    public getRates(base: string): Promise<IRatesResponse> {
        return this.client
            .get<IRatesResponse>(`/latest?base=${base.toUpperCase()}`)
            .then(response => response.data)
    }
}
