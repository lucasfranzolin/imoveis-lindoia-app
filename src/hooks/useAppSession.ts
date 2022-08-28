import { useRouter } from 'next/router';

import { fetchSession, sessionSel } from '../store/slices/session';
import { SessionState } from '../store/slices/session/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useEffectOnce } from './useEffectOnce';
import { useHttp } from './useHttp';
import { useUpdateEffect } from './useUpdateEffect';

export const useAppSession = (redirectTo: string): { isLoading: boolean } => {
    const router = useRouter();
    const http = useHttp();
    const dispatch = useAppDispatch();
    const { isAuthenticated, isFinished, isLoading, error } =
        useAppSelector(sessionSel);

    const redirect = (to: string) => {
        router.push(to);
    };

    useEffectOnce(() => {
        isFinished && !isAuthenticated
            ? redirect('/entrar')
            : isFinished && isAuthenticated
            ? redirect(redirectTo)
            : dispatch(fetchSession(http));
    });

    useUpdateEffect(() => {
        error && redirect('/entrar');
    }, [error]);

    return {
        isLoading: isLoading || !isAuthenticated,
    };
};
