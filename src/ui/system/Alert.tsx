const sizeClassnames = {
    lg: '',
    md: '',
    sm: '',
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

export const Alert = ({
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
                className={`flex items-center gap-4 px-4 py-2 ${
                    withBg ? 'bg-bg' : ''
                }`}
            >
                <span>icone</span>
                <div
                    className={`${isInline ? 'flex gap-2' : 'flex flex-col'} `}
                >
                    <span className="font-bold">{title}</span>
                    <span>{children}</span>
                </div>
            </div>
        </div>
    );
};
