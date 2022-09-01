import { useEffect } from 'react';

import { fetchSession, reset, sessionSel } from '../store/slices/session';
import { SessionState } from '../store/slices/session/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useHttp } from './useHttp';

export const useSession = (): SessionState & { reset: () => void } => {
    const http = useHttp();
    const dispatch = useAppDispatch();
    const { isLoading, isFinished, ...rest } = useAppSelector(sessionSel);

    useEffect(() => {
        !isFinished && !isLoading && dispatch(fetchSession(http));
    });

    const dispatchReset = () => {
        dispatch(reset());
    };

    return {
        isLoading,
        isFinished,
        ...rest,
        reset: dispatchReset,
    };
};
