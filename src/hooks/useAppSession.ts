import { fetchSession, sessionSel } from '../store/slices/session';
import { SessionState } from '../store/slices/session/types';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useHttp } from './useHttp';

export const useAppSession = (): [SessionState, () => void] => {
    const client = useHttp();
    const dispatch = useAppDispatch();
    const session = useAppSelector(sessionSel);

    const load = () => {
        dispatch(fetchSession(client));
    };

    return [session, load];
};
