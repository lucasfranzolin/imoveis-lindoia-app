import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

const sizeClassnames = {
    '4xl': 'text-4xl',
    '2xl': 'text-2xl',
    xl: 'text-xl',
    lg: 'text-lg',
};

export type LogoProps = {
    size?: keyof typeof sizeClassnames;
    link?: boolean;
};

const Logo = ({ size = 'lg', link = false }: LogoProps) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        link && router.push('/');
    }, [link, router]);

    return (
        <div
            className={`uppercase text-center ${sizeClassnames[size]} ${
                link ? 'cursor-pointer' : ''
            }`}
            onClick={handleClick}
            onKeyDown={handleClick}
            role={link ? 'link' : 'heading'}
        >
            <span className="text-body">imóveis</span>
            <span className="font-bold text-primary">lindóia</span>
        </div>
    );
};

export default memo(Logo);
