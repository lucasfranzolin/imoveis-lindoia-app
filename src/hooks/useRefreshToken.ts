import nookies from 'nookies';

import { httpClient } from '../utils/httpClient';

export const useRefreshToken = (): {
    refresh: () => Promise<string>;
} => {
    const refresh = async (): Promise<string> => {
        const { refreshToken } = nookies.get();
        if (!refreshToken) return Promise.reject('refreshToken is missing.');

        const { data } = await httpClient.post(
            '/api/auth/refresh',
            { refreshToken },
            { withCredentials: true }
        );
        nookies.set(undefined, 'accessToken', data.accessToken);
        return data.accessToken;
    };

    return { refresh };
};
