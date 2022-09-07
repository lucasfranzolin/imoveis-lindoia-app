import { Bars3Icon } from '@heroicons/react/24/solid';
import NextLink from 'next/link';

import { Button } from '../Button';
import { Logo } from '../Logo';

type Props = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    onAuth: () => void;
};

const Navigation = ({ isAuthenticated, isAdmin, onAuth }: Props) => {
    return (
        <nav className="bg-white w-full py-4 md:py-6">
            <div className="flex justify-between items-center">
                <Logo size="2xl" />
                <ul className="flex gap-4 items-center">
                    {isAdmin && (
                        <li>
                            <NextLink href="/admin" className="text-sm">
                                admin
                            </NextLink>
                        </li>
                    )}
                    <li>
                        <Button size="sm" onClick={onAuth}>
                            {isAuthenticated ? 'sair' : 'entrar'}
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
