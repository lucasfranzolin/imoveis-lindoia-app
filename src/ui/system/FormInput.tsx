import { forwardRef } from 'react';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    textarea?: boolean;
    rows?: number;
    error?: string;
    transparent?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, textarea, error, transparent, ...props }, ref) => {
        const bg = transparent ? 'bg-transparent' : 'bg-gray-input-bg';
        const ring = error ? 'ring ring-error' : 'ring-gray-title-active';
        const cn = `w-full py-3 px-4 rounded-xl text-black placeholder-gray-placeholder focus:outline-none focus:ring ${bg} ${ring} ${className} `;

        return textarea ? (
            <textarea
                ref={ref as any}
                className={cn}
                data-testid="textarea"
                {...(props as any)}
            />
        ) : (
            <input ref={ref} className={cn} {...props} />
        );
    }
);

FormInput.displayName = 'FormInput';
