import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { Button } from '../../ui/system/Button';

const Home = () => {
    const {
        signOut: [{ success }, fetchSignOut],
    } = useAuth();
    const router = useRouter();

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    return (
        <div className="p-12">
            <Button onClick={fetchSignOut}>Sair</Button>
        </div>
    );
};

export { Home };
