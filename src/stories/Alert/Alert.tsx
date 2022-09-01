import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';
import { memo } from 'react';

const sizeClassnames = {
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
};

const typeClassnames = {
    success: '',
    info: '',
    warning: '',
    danger: '',
};

export type AlertProps = {
    children: string;
    title: string;
    type?: keyof typeof typeClassnames;
    size?: keyof typeof sizeClassnames;
    isInline?: boolean;
    withBg?: boolean;
};

type IconProps = {
    type: keyof typeof typeClassnames;
    size: keyof typeof sizeClassnames;
};

const Icon = ({ type, size }: IconProps) => {
    const sizes = {
        lg: 'h-[56px]',
        md: 'h-[40px]',
        sm: 'h-[32px]',
    };

    return type === 'danger' ? (
        <XCircleIcon className={`text-error ${sizes[size]}`} />
    ) : type === 'info' ? (
        <InformationCircleIcon className={`text-primary ${sizes[size]}`} />
    ) : type === 'success' ? (
        <CheckCircleIcon className={`text-success ${sizes[size]}`} />
    ) : (
        <ExclamationTriangleIcon className={`text-secondary ${sizes[size]}`} />
    );
};

const Alert = ({
    children,
    title,
    type = 'info',
    size = 'md',
    isInline = false,
    withBg = false,
}: AlertProps) => {
    return (
        <div>
            <div
                className={`flex items-center gap-2 px-4 py-2 ${
                    withBg ? 'bg-bg' : ''
                }`}
            >
                <Icon type={type} size={size} />
                <div
                    className={`${isInline ? 'flex gap-1' : 'flex flex-col'} ${
                        sizeClassnames[size]
                    }`}
                >
                    <span className="font-bold">{title}</span>
                    <span>{children}</span>
                </div>
            </div>
        </div>
    );
};

export default memo(Alert);
