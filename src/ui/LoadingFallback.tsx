import { Spinner } from './system/Spinner';

interface IProps {
    children: string;
}

export const LoadingFallback = ({ children }: IProps) => (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
        <Spinner />
        {children}
    </div>
);
