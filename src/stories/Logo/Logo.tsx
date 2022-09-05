import { memo } from 'react';

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
    return (
        <div className={`uppercase text-center ${sizeClassnames[size]}`}>
            <span className="text-body">imóveis</span>
            <span className="font-bold text-primary">lindóia</span>
        </div>
    );
};

export default memo(Logo);
