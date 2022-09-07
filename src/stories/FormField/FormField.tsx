import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    memo,
} from 'react';

export type FormFieldProps = {
    children: React.ReactNode;
    error?: boolean;
    errorMsg?: string;
    id: string;
    label: string;
    required?: boolean;
    transparent?: boolean;
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
        }: FormFieldProps,
        ref
    ) => {
        const bg = transparent ? 'bg-transparent' : 'bg-input-bg';
        const ring = error ? 'ring ring-error' : 'ring-title-active';
        const className = `w-full py-3 px-4 text-black placeholder-placeholder focus:outline-none focus:ring ${bg} ${ring}`;

        const childrenWithProps = Children.map(children, (child) =>
            isValidElement(child)
                ? cloneElement(child, {
                      className,
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
