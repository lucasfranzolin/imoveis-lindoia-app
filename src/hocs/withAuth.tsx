import { useRouter } from 'next/router';
import React from 'react';

import { LoadingFallback } from '../components/shared/LoadingFallback';
import { useAppSelector } from '../hooks/useAppSelector';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useSession } from '../hooks/useSession';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { userSel } from '../store/slices/user';

type ProtectedRoute = {
    protected: boolean;
};

type WrappedComponentProps = ProtectedRoute & {
    [key: string]: any;
};

export const withAuth = (Component: any) => {
    const WrappedComponent = (props: WrappedComponentProps) => {
        const router = useRouter();
        const { isAuthenticated } = useAppSelector(userSel);
        const [{ error, loading }, getSession] = useSession();

        useEffectOnce(() => {
            !isAuthenticated && props.protected && getSession();
        });

        useUpdateEffect(() => {
            error && router.push('/entrar');
        }, [error]);

        if (loading || !isAuthenticated)
            return (
                <LoadingFallback>Verificando credenciais...</LoadingFallback>
            );

        return <Component {...props} />;
    };

    return WrappedComponent;
};
