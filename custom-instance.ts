import axios from "axios";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = "https://test"; // use your own URL here or environment variable
export const AXIOS_INSTANCE = Axios.create({ baseURL: baseURL });

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };

  return promise;
};

export default customInstance;
