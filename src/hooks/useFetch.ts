import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

import { FetchMethod, FetchResponse } from '../types/http';
import { useHttp } from './useHttp';

const initialState = {
    data: null,
    error: null,
    loading: false,
    success: false,
    message: null,
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
                setState({
                    ...initialState,
                    loading: true,
                });

                const { data } = await http[method](url, params, options);

                setState({
                    data,
                    error: null,
                    loading: false,
                    success: true,
                    message: null,
                });
            } catch (error) {
                setState({
                    data: null,
                    error:
                        (error as AxiosError<any>).response?.data.message ||
                        'Erro inesperado.',
                    loading: false,
                    success: false,
                    message: error,
                });
            }
        },
        [http, url]
    );

    return [state, fetch];
};
