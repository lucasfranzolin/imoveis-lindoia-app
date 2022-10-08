import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    memo,
} from 'react';

export const sizeClassnames = {
    lg: 'text-lg',
    md: 'text-md',
    sm: 'text-sm',
    xs: 'text-xs',
};

export type FormFieldProps = {
    children: React.ReactNode;
    error?: boolean;
    errorMsg?: string;
    id: string;
    label?: string;
    required?: boolean;
    transparent?: boolean;
    fullWidth?: boolean;
    size?: keyof typeof sizeClassnames;
};

const FormField = forwardRef(
    (
        {
            children,
            error = false,
            errorMsg,
            id,
            label,
            required = false,
            transparent = false,
            fullWidth = false,
            size = 'md',
        }: FormFieldProps,
        ref
    ) => {
        const bg = transparent ? 'bg-transparent' : 'bg-input-bg';
        const ring = error ? 'ring-error' : 'ring-primary';
        const width = fullWidth ? 'w-full' : `max-w-${size}`;

        const className = `py-3 px-4 text-black placeholder-placeholder focus:outline-none focus:ring ${bg} ${ring} ${width}`;

        const childrenWithProps = Children.map(children, (child) =>
            isValidElement(child)
                ? cloneElement(child as React.ReactElement<any>, {
                      className,
                      width,
                      ref,
                  })
                : child
        );

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
    }
);

FormField.displayName = 'FormField';

export default memo(FormField);
