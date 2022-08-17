import { httpClient } from '../utils/httpClient';

export const useRefreshToken = (): (() => Promise<string>) => {
    const refresh = async (): Promise<string> => {
        const {
            data: { accessToken },
        } = await httpClient.post(
            '/api/auth/refresh',
            {
                refreshToken: '',
            },
            {
                withCredentials: true,
            }
        );
        return accessToken;
    };

    return refresh;
};
