import { memo } from 'react';

import Spinner from '../Spinner';

export type LoadingFallbackProps = {
    children: string;
};

const LoadingFallback = ({ children }: LoadingFallbackProps) => (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
        <Spinner />
        {children}
    </div>
);

export default memo(LoadingFallback);
