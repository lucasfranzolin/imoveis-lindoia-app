import { fetchSession } from '../store/slices/session';
import { useAppDispatch } from './useAppDispatch';
import { useEffectOnce } from './useEffectOnce';
import { useHttp } from './useHttp';

export const useSession = () => {
    const client = useHttp();
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        dispatch(fetchSession(client));
    });
};
