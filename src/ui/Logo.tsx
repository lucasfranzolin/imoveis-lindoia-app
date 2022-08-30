const sizeClassnames = {
    '4xl': 'text-4xl',
    '2xl': 'text-2xl',
    xl: 'text-xl',
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
};

interface IProps {
    size?: keyof typeof sizeClassnames;
}

export const Logo = ({ size = 'lg' }: IProps) => {
    return (
        <div className={`uppercase text-center ${sizeClassnames[size]}`}>
            <span className="text-body">imóveis</span>
            <span className="font-bold text-primary">lindóia</span>
        </div>
    );
};
