import { forwardRef } from 'react';

type FormLabelProps = React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
> & {
    required?: boolean;
    error?: boolean;
};

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ required = false, children, ...props }, ref) => {
        return (
            <label className="text-gray-label" ref={ref as any} {...props}>
                {children}
                {required && <span className="text-error font-bold"> *</span>}
            </label>
        );
    }
);

FormLabel.displayName = 'FormLabel';
