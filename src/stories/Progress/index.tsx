import { memo } from 'react';

const bgClassnames = {
    primary: 'bg-primary',
    error: 'bg-error',
    warning: 'bg-warning',
};

export type ProgressProps = {
    value: number;
    label?: string;
    labelPlacement?: 'left' | 'right';
    bg?: keyof typeof bgClassnames;
};

const Progress = ({
    value,
    label,
    labelPlacement = 'right',
    bg = 'primary',
}: ProgressProps) => {
    const isRight = labelPlacement === 'right';
    const candidateWidth = value * 100;
    const width = candidateWidth > 100 ? 100 : candidateWidth;

    const getLabel = (lbl: string) => (
        <span className="text-label text-sm whitespace-nowrap	">{lbl}</span>
    );

    return (
        <div className="flex items-center gap-2 w-full">
            {label && !isRight && getLabel(label)}
            <div className="border h-4 w-full bg-bg">
                <div
                    className={`h-full ${bgClassnames[bg]}`}
                    style={{ width: width + '%' }}
                />
            </div>
            {label && isRight && getLabel(label)}
        </div>
    );
};

export default memo(Progress);
