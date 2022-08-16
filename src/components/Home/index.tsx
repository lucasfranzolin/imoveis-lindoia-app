import { useRouter } from 'next/router';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAuth } from '../../hooks/useAuth';
import { userSel } from '../../store/slices/user';
import { Button } from '../../ui/system/Button';

const Home = () => {
    const user = useAppSelector(userSel);
    const { signOut } = useAuth();
    const router = useRouter();

    const handleClick = async () => {
        if (!user.isAuthenticated) {
            router.push('/entrar');
            return;
        }
        await signOut();
    };

    return (
        <div>
            <pre>{JSON.stringify(user)}</pre>
            <Button onClick={handleClick}>
                {user.isAuthenticated ? 'Sair' : 'Entrar'}
            </Button>
        </div>
    );
};

export { Home };
