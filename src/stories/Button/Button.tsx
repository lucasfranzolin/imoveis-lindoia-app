import Ripple from 'material-ripple-effects';
import React, { memo } from 'react';

import { Spinner } from '../Spinner';

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

export const colorClassnames = {
    outlined:
        'text-primary bg-transparent hover:bg-primary-washed-out border border-primary focus:ring-primary disabled:text-primary-light disabled:border-primary-light',
    primary:
        'text-white bg-primary hover:bg-primary-dark disabled:text-white disabled:bg-primary-light focus:ring-primary',
    transparent:
        'text-primary bg-transparent hover:bg-primary-washed-out focus:ring-primary disabled:text-primary-light',
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
    loadingText?: string;
};

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'default',
    size = 'md',
    color = 'primary',
    disabled = false,
    loading = false,
    icon = undefined,
    className = '',
    loadingText = undefined,
    ...props
}) => {
    const isLink = variant === 'link';
    const rippleEffect = new Ripple();
    const isDisabled = disabled || loading;
    const cursor = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const defaultStyles =
        'flex items-center justify-center font-bold outline-none transition duration-200 ease-in-out focus:ring-0 rounded-full';
    const styles = isLink
        ? 'text-primary hover:underline'
        : `${colorClassnames[color]} ${sizeClassnames[size]} ${cursor} ${className}`;

    function handleMouseDown(e: any) {
        const onMouseDown = props.onMouseDown;
        if (!isDisabled && !isLink) {
            rippleEffect.create(e, variant === 'default' ? 'light' : 'dark');
        }
        return typeof onMouseDown === 'function' && onMouseDown(e);
    }

    return (
        <button
            {...props}
            disabled={isDisabled}
            className={`${defaultStyles} ${styles}`}
            onMouseDown={handleMouseDown}
        >
            <span
                className={`flex items-center space-x-2 ${
                    isDisabled ? 'opacity-80' : ''
                }`}
            >
                {loading ? (
                    <Spinner
                        size={size}
                        color={color === 'primary' ? 'white' : 'primary'}
                    />
                ) : icon ? (
                    icon
                ) : null}
                {loading && !!loadingText ? loadingText : children}
            </span>
        </button>
    );
};

export default memo(Button);
