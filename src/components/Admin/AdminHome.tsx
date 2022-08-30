import { HomeModernIcon, UsersIcon } from '@heroicons/react/24/solid';
import NextLink from 'next/link';

export const AdminHome = () => {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-title-active">Gerenciar imobiliária</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <NextLink href="/admin/imoveis">
                    <div className="flex gap-6 items-center p-6 rounded-3xl shadow transition-shadow hover:shadow-xl hover:cursor-pointer">
                        <HomeModernIcon className="text-primary w-5 h-5" />
                        <p className="uppercase tracking-widest text-label bold text-sm">
                            imóveis
                        </p>
                    </div>
                </NextLink>
                <NextLink href="/admin/clientes">
                    <div className="flex gap-6 items-center p-6 rounded-3xl shadow transition-shadow hover:shadow-xl hover:cursor-pointer">
                        <UsersIcon className="text-primary w-5 h-5" />
                        <p className="uppercase tracking-widest text-label bold text-sm">
                            clientes
                        </p>
                    </div>
                </NextLink>
            </div>
        </div>
    );
};
