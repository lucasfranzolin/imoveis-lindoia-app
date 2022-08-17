/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import httpStatus from 'http-status';
import { useCallback, useEffect, useState } from 'react';

import { userSel } from '../store/slices/user';
import { httpClient } from '../utils/httpClient';
import { useAppSelector } from './useAppSelector';
import { useIsMounted } from './useIsMounted';
import { useRefreshToken } from './useRefreshToken';

export type FetchResponse<T> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    success: boolean;
};

export type FetchMethod = (
    method: Method,
    options?: Omit<AxiosRequestConfig, 'method'>
) => Promise<void>;

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
};

export const useHttp = <T>(
    url: string
): [FetchResponse<T | null>, FetchMethod] => {
    const isMounted = useIsMounted();
    const { isAuthenticated } = useAppSelector(userSel);
    const refresh = useRefreshToken();

    const [state, setState] = useState<FetchResponse<T>>({ ...initialState });

    useEffect(() => {
        const requestIntercept = httpClient.interceptors.request.use(
            (config) => {
                if (!config?.headers?.authorization && isAuthenticated) {
                    config!.headers!.authorization = `Bearer ${'accessToken'}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = httpClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (
                    error?.response?.status === httpStatus.UNAUTHORIZED &&
                    !prevRequest?.sent
                ) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
                    return httpClient(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            httpClient.interceptors.request.eject(requestIntercept);
            httpClient.interceptors.response.eject(responseIntercept);
        };
    }, [isAuthenticated, refresh]);

    const fetch = useCallback(
        async (
            method: Method,
            config?: Omit<AxiosRequestConfig<any>, 'method' | 'url'>
        ) => {
            const _config = config ?? {};
            try {
                setState({ ...initialState });

                const { data } = await httpClient({
                    method,
                    url,
                    ..._config,
                });

                isMounted() &&
                    setState({
                        data,
                        error: null,
                        loading: false,
                        success: true,
                    });
            } catch (error) {
                isMounted() &&
                    setState({
                        data: null,
                        error: (error as AxiosError<any>).response?.data
                            .message,
                        loading: false,
                        success: true,
                    });
            }
        },
        [isMounted, url]
    );

    return [state, fetch];
};
