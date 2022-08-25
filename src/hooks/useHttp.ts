/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosInstance } from 'axios';
import httpStatus from 'http-status';
import nookies from 'nookies';
import { useEffect } from 'react';

import { httpClient } from '../utils/httpClient';
import { useRefreshToken } from './useRefreshToken';

export const useHttp = (isPublic = false): AxiosInstance => {
    const { refresh } = useRefreshToken();

    useEffect(() => {
        if (!isPublic) {
            const requestIntercept = httpClient.interceptors.request.use(
                (config) => {
                    if (!config?.headers?.authorization) {
                        const { accessToken } = nookies.get();
                        config!.headers!.authorization = `Bearer ${accessToken}`;
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );

            const responseIntercept = httpClient.interceptors.response.use(
                (response) => response,
                async (error) => {
                    if (
                        error.response.status === httpStatus.UNAUTHORIZED &&
                        !error.config.sent
                    ) {
                        error.config.sent = true;
                        try {
                            const newAccessToken = await refresh();
                            error.config.headers.authorization = `Bearer ${newAccessToken}`;
                        } catch (err) {
                            console.error(err);
                            return Promise.reject(error);
                        }
                        return httpClient(error.config);
                    }
                    return Promise.reject(error);
                }
            );

            return () => {
                httpClient.interceptors.request.eject(requestIntercept);
                httpClient.interceptors.response.eject(responseIntercept);
            };
        }
    }, [isPublic, refresh]);

    return httpClient;
};
