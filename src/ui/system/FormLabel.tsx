import { forwardRef } from 'react';

type FormLabelProps = React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
> & {
    required?: boolean;
    error?: boolean;
};

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ required = false, error = false, children, ...props }, ref) => {
        return (
            <label className="text-label" ref={ref as any} {...props}>
                {children}
                {required && <span className="font-bold"> *</span>}
            </label>
        );
    }
);

FormLabel.displayName = 'FormLabel';

export { FormLabel };
