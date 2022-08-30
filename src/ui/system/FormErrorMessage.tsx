interface IProps {
    children?: string;
    error?: boolean;
}

export const FormErrorMessage = ({ children, error = false }: IProps) => {
    if (!error) return null;
    return <span className="text-sm text-error">{children}</span>;
};
