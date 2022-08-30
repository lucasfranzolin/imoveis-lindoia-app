import { useRouter } from 'next/router';

import { useSession } from '../hooks/useSession';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { LoadingFallback } from '../ui/LoadingFallback';
import { Logo } from '../ui/Logo';

interface IProps {
    children: React.ReactNode | Array<React.ReactNode>;
}

export const AuthLayout = ({ children }: IProps) => {
    const router = useRouter();
    const { isFinished, isLoading, email, error } = useSession();

    useUpdateEffect(() => {
        isFinished && email && router.push('/');
    }, [isFinished, email]);

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
