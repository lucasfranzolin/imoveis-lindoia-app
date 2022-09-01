import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import { Button } from './Button';
import { Logo } from './Logo';

interface IProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export const Navigation = ({ isAuthenticated, isAdmin }: IProps) => {
    const {
        signOut: [{ success, loading }, fetchSignOut],
    } = useAuth();
    const router = useRouter();

    const handleClickAuth = () => {
        isAuthenticated ? fetchSignOut() : router.push('/entrar');
    };

    useUpdateEffect(() => {
        success && router.push('/entrar');
    }, [success, router]);

    return (
        <nav className="bg-white w-full py-4 md:py-6">
            <div className="flex justify-between items-center">
                <Logo size="2xl" />
                <button
                    type="button"
                    className="inline-flex items-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2"
                    aria-controls="navbar-default"
                    data-collapse-toggle="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div className="hidden md:flex" id="navbar-default">
                    <ul className="flex items-center md:flex-row md:space-x-8 md:text-sm md:font-medium">
                        {isAdmin && (
                            <>
                                <li>
                                    <NextLink href="/">site</NextLink>
                                </li>
                                <li>
                                    <NextLink href="/admin">admin</NextLink>
                                </li>
                            </>
                        )}
                        <li>
                            <Button
                                size="sm"
                                onClick={handleClickAuth}
                                loading={loading}
                            >
                                {isAuthenticated ? 'sair' : 'entrar'}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
