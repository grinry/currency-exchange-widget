import { Repository } from '@/repositories/repository';
import { IConverterContext, IConverterResponse } from '@/interfaces';
import { AxiosRequestConfig } from 'axios';

export class ConverterRepository {
    /**
     * @param params
     * @param config
     */
    get(params: IConverterContext, config?: AxiosRequestConfig | undefined) {
        const querystring = Repository.objectToQuerystring(params);
        return Repository.get<IConverterResponse>(`/rates?${querystring}`, config);
    }
}
