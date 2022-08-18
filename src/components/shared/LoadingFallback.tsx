interface IProps {
    children: string;
}

export const LoadingFallback = ({ children }: IProps) => (
    <span>{children}</span>
);
