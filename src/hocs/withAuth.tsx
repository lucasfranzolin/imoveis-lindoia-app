import { useRouter } from 'next/router';

import { LoadingFallback } from '../components/shared/LoadingFallback';
import { useAppSelector } from '../hooks/useAppSelector';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useSession } from '../hooks/useSession';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { sessionSel } from '../store/slices/session';

type WrappedComponentProps = {
    [key: string]: any;
};

export const withAuth = (Component: any) => {
    const WrappedComponent = ({ ...props }: WrappedComponentProps) => {
        const router = useRouter();
        const { isAuthenticated, isFinished } = useAppSelector(sessionSel);
        const [{ error, loading }, getSession] = useSession();

        const redirect = () => {
            router.push('/entrar');
        };

        useEffectOnce(() => {
            isFinished && !isAuthenticated
                ? redirect()
                : !isFinished && !isAuthenticated && getSession();
        });

        useUpdateEffect(() => {
            error && redirect();
        }, [error]);

        if (loading || !isAuthenticated)
            return (
                <LoadingFallback>Verificando credenciais...</LoadingFallback>
            );

        return <Component {...props} />;
    };

    return WrappedComponent;
};
