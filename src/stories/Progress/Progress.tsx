import { memo } from 'react';

type Props = {
    value: number;
    label?: string;
    labelPlacement?: 'left' | 'right';
};

const Progress = ({ value, label, labelPlacement = 'right' }: Props) => {
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
                    className="h-full bg-primary"
                    style={{ width: width + '%' }}
                />
            </div>
            {label && isRight && getLabel(label)}
        </div>
    );
};

export default memo(Progress);
