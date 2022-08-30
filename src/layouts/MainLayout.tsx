import { useRouter } from 'next/router';
import React from 'react';

import { useSession } from '../hooks/useSession';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { LoadingFallback } from '../ui/LoadingFallback';
import { Navigation } from '../ui/Navigation';
import { Alert } from '../ui/system/Alert';

interface IProps {
    children: React.ReactNode | Array<React.ReactNode>;
    isProtected?: boolean;
    allowedRoles?: Array<string>;
}

export const MainLayout = ({
    children,
    isProtected = false,
    allowedRoles = [],
}: IProps) => {
    const router = useRouter();
    const { isFinished, isLoading, email, roles } = useSession();

    useUpdateEffect(() => {
        isProtected && isFinished && !email && router.push('/entrar');
    }, [isProtected, isFinished, email]);

    if (isProtected && (isLoading || !email))
        return <LoadingFallback>Verificando credenciais...</LoadingFallback>;

    const hasRole =
        roles.filter((role) => allowedRoles.indexOf(role) !== -1).length > 0;

    if (!hasRole)
        return (
            <Alert title="Acesso negado!" withBg>
                Você não tem permissão para acessar esta página.
            </Alert>
        );

    return (
        <div id="main-layout" className="w-full max-w-4xl mx-auto">
            <div className="px-4">
                <Navigation isAuthenticated={!!email} isRealtor />
                <Breadcrumbs />
                <main className="mt-4">{children}</main>
            </div>
        </div>
    );
};
