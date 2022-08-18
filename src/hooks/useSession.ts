import { set } from '../store/slices/user';
import { UserData } from '../types/auth';
import { FetchResponse } from '../types/http';
import { useAppDispatch } from './useAppDispatch';
import { useFetch } from './useFetch';
import { useUpdateEffect } from './useUpdateEffect';

export const useSession = (): [FetchResponse<UserData>, () => void] => {
    const dispatch = useAppDispatch();
    const [response, fetch] = useFetch<UserData>('/api/auth/session');

    useUpdateEffect(() => {
        response.success && response.data && dispatch(set(response.data));
    }, [response.success, response.data]);

    const getSession = () => {
        fetch('get');
    };

    return [response, getSession];
};
