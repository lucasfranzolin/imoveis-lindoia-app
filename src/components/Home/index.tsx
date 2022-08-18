import { useRouter } from 'next/router';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { userSel } from '../../store/slices/user';
import { Button } from '../../ui/system/Button';

const Home = () => {
    const user = useAppSelector(userSel);
    const {
        signOut: [{ success }, fetchSignOut],
    } = useAuth();
    const router = useRouter();

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    const handleClick = async () =>
        !user.isAuthenticated ? router.push('/entrar') : fetchSignOut();

    return (
        <div className="p-12">
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <br />
            <Button onClick={handleClick}>
                {user.isAuthenticated ? 'Sair' : 'Entrar'}
            </Button>
        </div>
    );
};

export { Home };
