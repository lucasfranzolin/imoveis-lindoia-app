import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { memo } from 'react';

import Button from '../Button';

export type PaginationProps = {
    page: number;
    totalPages: number;
    totalItems: number;
    onNext: () => void;
    onPrevious: () => void;
    className?: string;
};

const Pagination = ({
    page,
    totalPages,
    totalItems,
    onNext,
    onPrevious,
    className,
}: PaginationProps) => {
    return (
        <div
            className={`w-full flex items-center justify-between ${className}`}
        >
            <span>
                {totalItems} ite{totalItems > 1 ? 'ns' : 'm'}.
            </span>
            <div className="flex items-center space-x-2">
                <Button
                    icon={<ChevronLeftIcon />}
                    variant="transparent"
                    onClick={onPrevious}
                />
                <span>
                    {page} de {totalPages}
                </span>
                <Button
                    icon={<ChevronRightIcon />}
                    variant="transparent"
                    onClick={onNext}
                />
            </div>
        </div>
    );
};

export default memo(Pagination);
