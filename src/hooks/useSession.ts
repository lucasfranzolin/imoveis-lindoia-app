import { fetchSession, sessionSel } from '../store/slices/session';
import { SessionState } from '../store/slices/session/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useEffectOnce } from './useEffectOnce';
import { useHttp } from './useHttp';

export const useSession = (): SessionState => {
    const http = useHttp();
    const dispatch = useAppDispatch();
    const { isLoading, isFinished, ...rest } = useAppSelector(sessionSel);

    useEffectOnce(() => {
        !isFinished && !isLoading && dispatch(fetchSession(http));
    });

    return {
        isLoading,
        isFinished,
        ...rest,
    };
};
