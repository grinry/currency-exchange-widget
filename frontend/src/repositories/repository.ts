import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { environment } from "@/environment";

export class Repository {
  /**
   * @param path
   * @param config
   */
  public static get<T = any, R = AxiosResponse<T>>(
    path: string,
    config?: AxiosRequestConfig | undefined
  ) {
    return Axios.get<T, R>(`${environment.apiUri}${path}`, config);
  }

  public static objectToQuerystring(obj: { [key: string]: any }): string {
    return Object.keys(obj)
      .map(key => key + "=" + obj[key])
      .join("&");
  }
}
