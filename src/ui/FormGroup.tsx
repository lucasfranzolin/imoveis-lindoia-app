import { Children, cloneElement, isValidElement } from 'react';

interface IProps {
    children: Array<React.ReactNode>;
    required?: boolean;
    error?: boolean;
}

const FormGroup = ({ children, required = false, error = false }: IProps) => {
    const childrenWithProps = Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child, { required, error }) : child
    );
    return <div className="flex flex-col space-y-1">{childrenWithProps}</div>;
};

export { FormGroup };
