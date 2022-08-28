import { useRouter } from 'next/router';

import { LoadingFallback } from '../components/shared/LoadingFallback';
import { useAppSession } from '../hooks/useAppSession';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

type WrappedComponentProps = {
    [key: string]: any;
};

export const withAuth = (Component: any) => {
    const WrappedComponent = ({ ...props }: WrappedComponentProps) => {
        const router = useRouter();
        const [
            {
                error, //
                isAuthenticated,
                isFinished,
                isLoading,
            },
            loadSession,
        ] = useAppSession();

        const redirect = () => {
            router.push('/entrar');
        };

        useEffectOnce(() => {
            isFinished && !isAuthenticated
                ? redirect()
                : !isFinished && !isAuthenticated && loadSession();
        });

        useUpdateEffect(() => {
            error && redirect();
        }, [error]);

        if (isLoading || !isAuthenticated)
            return (
                <LoadingFallback>Verificando credenciais...</LoadingFallback>
            );

        return <Component {...props} />;
    };

    return WrappedComponent;
};
