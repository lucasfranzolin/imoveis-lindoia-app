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
                <Button
                    color="transparent"
                    aria-controls="navbar-default"
                    data-collapse-toggle="navbar-default"
                    aria-expanded="false"
                    icon={
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
                    }
                />
                <div className="hidden md:flex" id="navbar-default">
                    <ul className="flex items-center md:flex-row md:space-x-8 md:text-sm md:font-medium">
                        {isAdmin && (
                            <li>
                                <NextLink href="/admin">admin</NextLink>
                            </li>
                        )}
                        <li>
                            <Button size="sm" onClick={onAuth}>
                                {isAuthenticated ? 'sair' : 'entrar'}
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
