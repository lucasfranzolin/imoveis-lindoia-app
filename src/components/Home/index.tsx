import { useRouter } from 'next/router';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { sessionSel } from '../../store/slices/session';
import { Button } from '../../ui/system/Button';

const Home = () => {
    const session = useAppSelector(sessionSel);
    const {
        signOut: [{ success }, fetchSignOut],
    } = useAuth();
    const router = useRouter();

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    const handleClick = async () =>
        !session.isAuthenticated ? router.push('/entrar') : fetchSignOut();

    return (
        <div className="p-12">
            <pre>{JSON.stringify(session, null, 4)}</pre>
            <br />
            <Button onClick={handleClick}>
                {session.isAuthenticated ? 'Sair' : 'Entrar'}
            </Button>
        </div>
    );
};

export { Home };
