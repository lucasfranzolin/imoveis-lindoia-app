import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

import { FetchMethod, FetchResponse } from '../types/http';
import { useHttp } from './useHttp';

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
};

export const useFetch = <T>(
    url: string,
    isPublic = false
): [FetchResponse<T>, FetchMethod] => {
    const http = useHttp(isPublic);

    const [state, setState] = useState<FetchResponse<T>>({ ...initialState });

    const fetch: FetchMethod = useCallback(
        async (method, params = {}, options = {}) => {
            try {
                setState({ ...initialState });

                const urlWithStage =
                    process.env.NODE_ENV === 'development'
                        ? url
                        : url.replace(
                              '/api', //
                              `/api/${process.env.NEXT_PUBLIC_STAGE}`
                          );
                const { data } = await http[method](
                    urlWithStage,
                    params,
                    options
                );

                setState({
                    data,
                    error: null,
                    loading: false,
                    success: true,
                });
            } catch (error) {
                setState({
                    data: null,
                    error: (error as AxiosError<any>).response?.data.message,
                    loading: false,
                    success: true,
                });
            }
        },
        [http, url]
    );

    return [state, fetch];
};
