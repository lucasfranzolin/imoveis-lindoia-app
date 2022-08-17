import { useCallback } from 'react';

import { reset, set } from '../store/slices/user';
import { SignInParams, SignInResult, SignUpParams } from '../types/auth';
import { FetchResponse } from '../types/http';
import { httpClient } from '../utils/httpClient';
import { useAppDispatch } from './useAppDispatch';
import { useHttp } from './useHttp';
import { useUpdateEffect } from './useUpdateEffect';

export const useAuth = (): {
    signIn: [
        FetchResponse<SignInResult | null>,
        (params: SignInParams) => void
    ];
    signOut: () => Promise<void>;
    signUp: [FetchResponse<null>, (params: SignUpParams) => Promise<void>];
} => {
    const dispatch = useAppDispatch();
    const [signUpResponse, signUp] = useHttp<null>('/api/auth/sign-up');
    const [signInResponse, signIn] = useHttp<SignInResult>('/api/auth/sign-in');

    useUpdateEffect(() => {
        signInResponse.success &&
            signInResponse.data &&
            dispatch(set(signInResponse.data.user));
    }, [signInResponse.success, signInResponse.data]);

    const fetchSignUp = async (params: SignUpParams) => signUp('post', params);

    const fetchSignIn = (params: SignInParams) => signIn('post', params);

    const signOut = useCallback(async () => {
        await httpClient.post('/api/auth/sign-out', { refreshToken: '' });
        dispatch(reset());
    }, [dispatch]);

    return {
        signIn: [signInResponse, fetchSignIn],
        signOut,
        signUp: [signUpResponse, fetchSignUp],
    };
};
