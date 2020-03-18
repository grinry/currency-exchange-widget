import { Repository } from "@/repositories/repository";
import { ConverterContext, ConverterResponse } from "@/interfaces";
import { AxiosRequestConfig } from "axios";

export class ConverterRepository {
  /**
   * @param params
   * @param config
   */
  get(params: ConverterContext, config?: AxiosRequestConfig | undefined) {
    params.base_amount = params.base_amount * 100; // convert to cents
    const querystring = Repository.objectToQuerystring(params);
    return Repository.get<ConverterResponse>(
      `/exchange?${querystring}`,
      config
    ).then(response => {
      response.data.quote_amount = response.data.quote_amount / 100; // Convert back from cents.
      return response;
    });
  }
}
