/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosInstance } from 'axios';
import httpStatus from 'http-status';
import nookies from 'nookies';

import { RefreshTokenResult } from '../types/auth';
import { useEffectOnce } from './useEffectOnce';

export const useHttp = (isPublic = false): AxiosInstance => {
    const httpClient: AxiosInstance = axios.create({});

    useEffectOnce(() => {
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
                            const { refreshToken } = nookies.get();
                            if (!refreshToken)
                                return Promise.reject(
                                    'refreshToken is missing.'
                                );
                            const { data } =
                                await httpClient.post<RefreshTokenResult>(
                                    '/api/auth/refresh',
                                    { refreshToken }
                                );
                            const newAccessToken = data.accessToken;
                            nookies.set(
                                undefined,
                                'accessToken',
                                newAccessToken
                            );
                            error.config.headers.authorization = `Bearer ${newAccessToken}`;
                        } catch (err) {
                            console.error(err);
                            return Promise.reject(error);
                        }
                        return httpClient.request(error.config);
                    }
                    return Promise.reject(error);
                }
            );

            return () => {
                httpClient.interceptors.request.eject(requestIntercept);
                httpClient.interceptors.response.eject(responseIntercept);
            };
        }
    });

    return httpClient;
};
