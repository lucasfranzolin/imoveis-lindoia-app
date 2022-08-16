import { useCallback } from 'react';

import { axiosPublic } from '../http/axios';
import { reset, set } from '../store/slices/user';
import { SignInParams, SignUpParams } from '../types/auth';
import { useAppDispatch } from './useAppDispatch';
import { useSessionStorage } from './useSessionStorage';

export const useAuth = (): {
    accessToken: string;
    refreshToken: string;
    setAccessToken: (accessToken: string) => void;
    signIn: (params: SignInParams) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (params: SignUpParams) => Promise<void>;
} => {
    const dispatch = useAppDispatch();
    const [
        accessToken, //
        setAccessToken,
        removeAccessToken,
    ] = useSessionStorage('accessToken', '');
    const [
        refreshToken, //
        setRefreshToken,
        removeRefreshToken,
    ] = useSessionStorage('refreshToken', '');

    const signIn = useCallback(
        async (params: SignInParams) => {
            const { data } = await axiosPublic.post('/auth/sign-in', params);
            setAccessToken(data.auth.accessToken);
            setRefreshToken(data.auth.refreshToken);
            dispatch(set(data.user));
        },
        [dispatch, setAccessToken, setRefreshToken]
    );

    const signOut = useCallback(async () => {
        await axiosPublic.post('/auth/sign-out', { refreshToken });
        removeAccessToken();
        removeRefreshToken();
        dispatch(reset());
    }, [dispatch, refreshToken, removeAccessToken, removeRefreshToken]);

    const signUp = async (params: SignUpParams) => {
        await axiosPublic.post('/auth/sign-up', params);
    };

    return {
        accessToken,
        refreshToken,
        setAccessToken,
        signIn,
        signOut,
        signUp,
    };
};
