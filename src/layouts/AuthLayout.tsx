import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useEffectOnce } from '../hooks/useEffectOnce';
import { useSession } from '../hooks/useSession';
import { LoadingFallback } from '../stories/LoadingFallback';
import { Logo } from '../stories/Logo';

interface IProps {
    children: React.ReactNode | Array<React.ReactNode>;
}

export const AuthLayout = ({ children }: IProps) => {
    const router = useRouter();
    const { isFinished, isLoading, email, error } = useSession();

    useEffect(() => {
        isFinished && email && router.push('/');
    }, [email, isFinished, router]);

    if (isFinished && email) return null;

    if (isLoading && !error)
        return <LoadingFallback>Verificando credenciais...</LoadingFallback>;

    return (
        <div
            id="auth-layout"
            className="flex flex-col items-center justify-center w-full h-full p-8"
        >
            <Logo size="4xl" />
            {children}
        </div>
    );
};
