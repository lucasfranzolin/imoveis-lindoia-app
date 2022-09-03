import nookies from 'nookies';

import { SignInParams, SignInResult, SignUpParams } from '../types/auth';
import { FetchResponse } from '../types/http';
import { useAppSession } from './useAppSession';
import { useFetch } from './useFetch';
import { useUpdateEffect } from './useUpdateEffect';

export const useAuth = (): {
    signIn: [FetchResponse<SignInResult>, (params: SignInParams) => void];
    signOut: [FetchResponse<null>, () => void];
    signUp: [FetchResponse<null>, (params: SignUpParams) => void];
} => {
    const [, getSession, resetSession] = useAppSession();
    const [signUpResponse, signUp] = useFetch<null>('/api/auth/sign-up', true);
    const [signInResponse, signIn] = useFetch<SignInResult>(
        '/api/auth/sign-in',
        true
    );
    const [signOutResponse, signOut] = useFetch<null>(
        '/api/auth/sign-out',
        true
    );

    useUpdateEffect(() => {
        if (signInResponse.success && signInResponse.data) {
            const { accessToken, refreshToken } = signInResponse.data;
            nookies.set(undefined, 'accessToken', accessToken);
            nookies.set(undefined, 'refreshToken', refreshToken);
            getSession();
        }
    }, [signInResponse.success, signInResponse.data]);

    useUpdateEffect(() => {
        if (signOutResponse.success) {
            nookies.destroy(undefined, 'accessToken');
            nookies.destroy(undefined, 'refreshToken');
            resetSession();
        }
    }, [signOutResponse.success]);

    const fetchSignUp = async (params: SignUpParams) => signUp('post', params);

    const fetchSignIn = (params: SignInParams) => signIn('post', params);

    const fetchSignOut = () => {
        const { refreshToken } = nookies.get();
        signOut('post', { refreshToken });
    };

    return {
        signIn: [signInResponse, fetchSignIn],
        signOut: [signOutResponse, fetchSignOut],
        signUp: [signUpResponse, fetchSignUp],
    };
};
