/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AxiosInstance } from 'axios';
import httpStatus from 'http-status';
import { useEffect } from 'react';

import { axiosPrivate } from '../http/axios';
import { userSel } from '../store/slices/user';
import { useAppSelector } from './useAppSelector';
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';

export const useHttp = (): AxiosInstance => {
    const { isAuthenticated } = useAppSelector(userSel);
    const refresh = useRefreshToken();
    const { accessToken } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config?.headers?.authorization && isAuthenticated) {
                    config!.headers!.authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
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
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refresh, isAuthenticated]);

    return axiosPrivate;
};
