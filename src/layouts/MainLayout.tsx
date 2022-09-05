import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import { useAppSession } from '../hooks/useAppSession';
import { useAuth } from '../hooks/useAuth';
import { useEffectOnce } from '../hooks/useEffectOnce';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { Alert } from '../stories/Alert';
import { Breadcrumbs } from '../stories/Breadcrumbs';
import { LoadingFallback } from '../stories/LoadingFallback';
import { Navigation } from '../stories/Navigation';

type Props = {
    children: React.ReactNode | Array<React.ReactNode>;
    isProtected?: boolean;
    allowedRoles?: Array<string>;
};

export const MainLayout = ({
    children,
    isProtected = false,
    allowedRoles = [],
}: Props) => {
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
    const {
        signOut: [{ success }, fetchSignOut],
    } = useAuth();
    const isAuthenticated = useMemo(() => !!email, [email]);
    const isAdmin = useMemo(() => roles.includes('admin'), [roles]);

    useEffectOnce(() => {
        !isFinished && fetchSession();
    });

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    useEffect(() => {
        isProtected && isFinished && !email && router.push('/entrar');
    }, [isProtected, isFinished, email, router]);

    const handleClickAuth = () => {
        isAuthenticated ? fetchSignOut() : router.push('/entrar');
    };

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
                    isAuthenticated={isAuthenticated}
                    isAdmin={isAdmin}
                    onAuth={handleClickAuth}
                />
                <Breadcrumbs />
                <main className="mt-4">{children}</main>
            </div>
        </div>
    );
};
