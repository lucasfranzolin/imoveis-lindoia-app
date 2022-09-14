import { XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useEffectOnce } from '../../hooks/useEffectOnce';
import { bytesToMegaBytes } from '../../utils/files';
import { Button } from '../Button';

type Props = {
    file: File;
    draggableId: string;
    index: number;
    onRemove: (index: number) => void;
};

const DraggableView = ({ file, draggableId, index, onRemove }: Props) => {
    const [src, setSrc] = useState<string | null>(null);

    useEffectOnce(() => {
        const objectUrl = URL.createObjectURL(file);
        setSrc(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    });

    const handleRemove = () => onRemove(index);

    const filesizeMb = bytesToMegaBytes(file.size).toFixed(2);

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided, { isDragging }) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex p-2 bg-white hover:cursor-move ${
                        isDragging ? 'shadow-2xl' : 'shadow'
                    }`}
                >
                    <div className="flex flex-col sm:flex-row gap-2 items-start flex-1">
                        <div className="aspect-video h-14 relative">
                            {src && (
                                <Image
                                    className="object-scale-down"
                                    src={src}
                                    alt=""
                                    layout="fill"
                                />
                            )}
                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="truncate mb-1">{file.name}</span>
                            <span className="text-xs text-label">
                                {filesizeMb} MB
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-start sm:items-center sm:justify-center">
                        <Button
                            icon={<XMarkIcon className="h-4 w-4" />}
                            variant="transparent"
                            onClick={handleRemove}
                            size="sm"
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};

export default memo(DraggableView);
