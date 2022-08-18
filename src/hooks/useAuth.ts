import nookies from 'nookies';

import { reset, set } from '../store/slices/user';
import { SignInParams, SignInResult, SignUpParams } from '../types/auth';
import { FetchResponse } from '../types/http';
import { useAppDispatch } from './useAppDispatch';
import { useFetch } from './useFetch';
import { useUpdateEffect } from './useUpdateEffect';

export const useAuth = (): {
    signIn: [FetchResponse<SignInResult>, (params: SignInParams) => void];
    signOut: [FetchResponse<null>, () => void];
    signUp: [FetchResponse<null>, (params: SignUpParams) => void];
} => {
    const dispatch = useAppDispatch();
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
            const { user, auth } = signInResponse.data;
            dispatch(set(user));
            nookies.set(undefined, 'accessToken', auth.accessToken);
            nookies.set(undefined, 'refreshToken', auth.refreshToken);
        }
    }, [signInResponse.success, signInResponse.data]);

    useUpdateEffect(() => {
        if (signOutResponse.success) {
            nookies.destroy(undefined, 'accessToken');
            nookies.destroy(undefined, 'refreshToken');
            dispatch(reset());
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
