const variantClassnames = {
    default: 'block',
    link: 'inline-block',
};

const sizeClassnames = {
    lg: 'px-6 py-4',
    md: 'px-6 py-3',
    sm: 'px-3 py-1 text-sm',
    xs: 'px-2 text-sm',
};

const colorClassnames = {
    primary:
        'text-white bg-primary hover:bg-primary-dark disabled:text-white disabled:bg-primary-light focus:ring-primary-dark',
    transparent: 'text-body bg-transparent focus:ring-primary',
};

export type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    variant?: keyof typeof variantClassnames;
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'default',
    size = 'md',
    color = 'primary',
    disabled,
    loading,
    icon,
    className = '',
    ...props
}) => {
    if (variant === 'link')
        return (
            <button
                className={`font-bold outline-none text-primary focus:ring-0`}
                {...props}
            >
                {children}
            </button>
        );

    return (
        <button
            disabled={disabled || loading}
            className={`flex items-center justify-center font-bold outline-none transition duration-200 ease-in-out focus:ring-0 rounded-full ${colorClassnames[color]} ${sizeClassnames[size]} ${className}`}
            {...props}
        >
            <span
                className={
                    loading ? 'opacity-0' : 'flex items-center space-x-2'
                }
            >
                {icon && <span className="items-center">{icon}</span>}
                {children}
            </span>
        </button>
    );
};
