import { memo } from 'react';

const sizeClassnames = {
    lg: 'h-[32px]',
    md: 'h-[24px]',
    sm: 'h-[16px]',
    xs: 'h-[8px]',
};

const colorClassnames = {
    primary: 'text-primary',
    white: 'text-white',
};

export type SpinnerProps = {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
};

const Spinner = ({ size = 'md', color = 'primary' }: SpinnerProps) => {
    return (
        <svg
            className={`animate-spin -ml-1 mr-3 ${sizeClassnames[size]} ${colorClassnames[color]}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export default memo(Spinner);
