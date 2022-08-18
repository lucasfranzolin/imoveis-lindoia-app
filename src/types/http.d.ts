import { AxiosRequestConfig } from 'axios';

export type FetchResponse<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    success: boolean;
};

export type Method = 'get' | 'delete' | 'post' | 'put' | 'patch';
export type Params = { [key: string]: string };
export type Options = Omit<AxiosRequestConfig, 'method' | 'url'>;

export type FetchMethod = (
    method: Method,
    params?: Params,
    options?: Options
) => Promise<void>;
