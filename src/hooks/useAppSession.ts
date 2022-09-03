import { fetchSession, reset, sessionSel } from '../store/slices/session';
import { SessionState } from '../store/slices/session/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useHttp } from './useHttp';

export const useAppSession = (): [SessionState, () => void, () => void] => {
    const http = useHttp();
    const dispatch = useAppDispatch();
    const session = useAppSelector(sessionSel);

    const dispatchFetch = () => {
        dispatch(fetchSession(http));
    };

    const dispatchReset = () => {
        dispatch(reset());
    };

    return [session, dispatchFetch, dispatchReset];
};
