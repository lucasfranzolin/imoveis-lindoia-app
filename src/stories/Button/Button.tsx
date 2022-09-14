import Ripple from 'material-ripple-effects';
import { cloneElement, memo } from 'react';

import { Spinner } from '../Spinner';

const iconSizeClassnames = {
    lg: 'h-8',
    md: 'h-6',
    sm: 'h-4',
    xs: 'h-2',
};

export const sizeClassnames = {
    lg: 'h-12 px-6 text-lg',
    md: 'h-10 px-6',
    sm: 'h-8 px-3 text-sm',
    xs: 'h-6 px-2 text-xs',
};

export const variantClassnames = {
    outlined:
        'text-primary bg-transparent hover:bg-primary-washed-out border border-primary disabled:text-primary-light disabled:border-primary-light',
    filled: 'text-white bg-primary hover:bg-primary-dark disabled:text-white disabled:bg-primary-light',
    transparent:
        'text-primary bg-transparent hover:bg-primary-washed-out disabled:text-primary-light',
};

export type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    children?: React.ReactNode;
    as?: 'default' | 'link';
    size?: keyof typeof sizeClassnames;
    variant?: keyof typeof variantClassnames;
    loading?: boolean;
    icon?: JSX.Element;
    loadingText?: string;
    fullWidth?: boolean;
};

const Button = ({
    children,
    as = 'default',
    size = 'md',
    variant = 'filled',
    disabled = false,
    loading = false,
    icon = undefined,
    className = '',
    loadingText = undefined,
    fullWidth = false,
    ...props
}: ButtonProps) => {
    const isLink = as === 'link';
    const isIconButton = children === undefined;
    const rippleEffect = new Ripple();
    const isDisabled = disabled || loading;
    const cursor = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';

    const defaultStyles = `font-bold focus:outline-none outline-none transition-all duration-200 ease-in-out ${
        isDisabled ? 'opacity-60' : fullWidth ? 'w-full' : ''
    }`;
    const styles = isLink
        ? `text-primary hover:underline`
        : `${variantClassnames[variant]} ${cursor} ${
              isIconButton ? 'p-2 rounded-full' : sizeClassnames[size]
          }`;

    function handleMouseDown(e: any) {
        const onMouseDown = props.onMouseDown;
        if (!isDisabled && !isLink) {
            rippleEffect.create(e, isLink ? 'dark' : 'light');
        }
        return typeof onMouseDown === 'function' && onMouseDown(e);
    }

    return (
        <button
            {...props}
            disabled={isDisabled}
            className={`${defaultStyles} ${styles} ${className}`}
            onMouseDown={handleMouseDown}
        >
            <span className="flex items-center justify-center space-x-2">
                {loading ? (
                    <Spinner
                        size={size}
                        color={variant === 'filled' ? 'white' : 'primary'}
                    />
                ) : icon ? (
                    cloneElement(icon, {
                        className: iconSizeClassnames[size],
                    })
                ) : null}
                {!loading && children ? (
                    <span>{children}</span>
                ) : loadingText && children ? (
                    <span>{loadingText}</span>
                ) : null}
            </span>
        </button>
    );
};

export default memo(Button);
