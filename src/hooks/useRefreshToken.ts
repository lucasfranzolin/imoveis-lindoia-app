import { axiosPublic } from '../http/axios';
import { useAuth } from './useAuth';

export const useRefreshToken = (): (() => Promise<string>) => {
    const { setAccessToken, refreshToken } = useAuth();

    const refresh = async (): Promise<string> => {
        const {
            data: { accessToken },
        } = await axiosPublic.post(
            '/auth/refresh',
            {
                refreshToken,
            },
            {
                withCredentials: true,
            }
        );
        setAccessToken(accessToken);
        return accessToken;
    };

    return refresh;
};
