import Axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_DOMAIN_URL; // use your own URL here or environment variable
export const AXIOS_INSTANCE = Axios.create({ baseURL: baseURL });

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
}: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  params?: any;
  data?: BodyType<any>;
  responseType?: string;
  headers?: {
    "Access-Control-Allow-Origin": "*";
    "Content-Type": "application/json";
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Methods, authorization, x-header-hello";
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS";
    "x-header-hello": "world";
  };
}): Promise<T> => {
  let response;

  if (params) {
    response = await fetch(`${baseURL}${url}?` + new URLSearchParams(params), {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
    });
    return response.json();
  } else {
    response = await fetch(`${baseURL}${url}`, {
      method,
      ...(data ? { body: JSON.stringify(data) } : {}),
    });
    return response.json();
  }
};

export default customInstance;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
// export type BodyType<BodyData> = CamelCase<BodyType>;
export type BodyType<BodyData> = BodyData & { headers?: any };
