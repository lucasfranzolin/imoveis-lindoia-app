import * as React from 'react';

const sizeClassnames = {
    md: 'px-6 py-2 text-sm rounded-lg',
    sm: 'px-2 py-1 text-sm rounded-md',
    xs: 'px-1 text-sm rounded-5',
};

const colorClassnames = {
    accent: 'text-white bg-accent hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover focus:ring-accent',
    primary:
        'text-primary-800 bg-transparent hover:bg-primary-100 disabled:text-primary-500 focus:ring-primary-200',
    transparent: 'text-primary-800 bg-transparent focus:ring-accent',
};

export type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    size = 'md',
    color = 'accent',
    disabled,
    loading,
    icon,
    className = '',
    ...props
}) => {
    return (
        <button
            disabled={disabled || loading}
            className={`flex items-center justify-center font-bold outline-none transition duration-200 ease-in-out focus:ring ${colorClassnames[color]} ${sizeClassnames[size]} ${className}`}
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
