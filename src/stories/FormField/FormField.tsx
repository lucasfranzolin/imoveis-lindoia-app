import { cloneElement, isValidElement, memo } from 'react';

export type FormFieldProps = {
    children: React.ReactNode;
    error?: boolean;
    errorMsg?: string;
    id: string;
    label: string;
    required?: boolean;
    transparent?: boolean;
};

const FormField = ({
    children,
    error = false,
    errorMsg,
    id,
    label,
    required = false,
    transparent = false,
}: FormFieldProps) => {
    const bg = transparent ? 'bg-transparent' : 'bg-input-bg';
    const ring = error ? 'ring ring-error' : 'ring-title-active';
    const className = `w-full py-3 px-4 rounded-xl text-black placeholder-placeholder focus:outline-none focus:ring ${bg} ${ring}`;

    const childrenWithProps = isValidElement(children)
        ? cloneElement(children, { className })
        : children;

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-label" htmlFor={id}>
                {label}
                {required && <span className="font-bold"> *</span>}
            </label>
            {childrenWithProps}
            {error && errorMsg && (
                <span className="text-sm text-error">{errorMsg}</span>
            )}
        </div>
    );
};

export default memo(FormField);
