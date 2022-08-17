import { useCallback } from 'react';

import { reset, set } from '../store/slices/user';
import { SignInParams, SignUpParams } from '../types/auth';
import { httpClient } from '../utils/httpClient';
import { useAppDispatch } from './useAppDispatch';

export const useAuth = (): {
    signIn: (params: SignInParams) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (params: SignUpParams) => Promise<void>;
} => {
    const dispatch = useAppDispatch();

    const signIn = useCallback(
        async (params: SignInParams) => {
            const { data } = await httpClient.post('/api/auth/sign-in', params);
            dispatch(set(data.user));
        },
        [dispatch]
    );

    const signOut = useCallback(async () => {
        await httpClient.post('/api/auth/sign-out', { refreshToken: '' });
        dispatch(reset());
    }, [dispatch]);

    const signUp = async (params: SignUpParams) => {
        await httpClient.post('/api/auth/sign-up', params);
    };

    return {
        signIn,
        signOut,
        signUp,
    };
};
