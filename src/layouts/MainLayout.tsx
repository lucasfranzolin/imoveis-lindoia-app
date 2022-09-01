import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAppSession } from '../hooks/useAppSession';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { Alert } from '../stories/Alert';
import { Breadcrumbs } from '../stories/Breadcrumbs';
import { LoadingFallback } from '../stories/LoadingFallback';
import { Navigation } from '../stories/Navigation';

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
    const [
        {
            isFinished, //
            isLoading,
            email,
            roles,
        },
        fetchSession,
    ] = useAppSession();

    useEffectOnce(() => {
        !isFinished && fetchSession();
    });

    useEffect(() => {
        isProtected && isFinished && !email && router.push('/entrar');
    }, [isProtected, isFinished, email, router]);

    if (isProtected && !isLoading && !email) return null;

    if (isProtected && isLoading && !email)
        return <LoadingFallback>Verificando credenciais...</LoadingFallback>;

    const hasRole =
        roles.filter((role) => allowedRoles.indexOf(role) !== -1).length > 0;

    if (isProtected && email && !hasRole)
        return (
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
                <Alert title="Acesso negado!" type="danger" size="lg">
                    Você não tem permissão para acessar esta página.
                </Alert>
            </div>
        );

    return (
        <div id="main-layout" className="w-full max-w-4xl mx-auto">
            <div className="px-4">
                <Navigation
                    isAuthenticated={!!email}
                    isAdmin={roles.includes('admin')}
                />
                <Breadcrumbs />
                <main className="mt-4">{children}</main>
            </div>
        </div>
    );
};
