import { useRouter } from 'next/router';

import { useAppSession } from '../hooks/useAppSession';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { LoadingFallback } from '../ui/LoadingFallback';

export interface IAuthProps {
    isAuthenticated: boolean;
    user: {
        email: string | null;
    };
}

export const withAuth = (Component: React.ComponentType<any>) => {
    const WrappedComponent = (props: IAuthProps) => {
        const router = useRouter();
        const { isLoading, isFinished, email } = useAppSession();

        useUpdateEffect(() => {
            isFinished && !email && router.push('/entrar');
        }, [isFinished, email]);

        if (isFinished && !email) return null;

        if (isLoading && !email && !isFinished)
            return (
                <LoadingFallback>Verificando credenciais...</LoadingFallback>
            );

        return <Component {...props} />;
    };

    return WrappedComponent;
};
