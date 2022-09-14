import { ArrowUpIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { memo, useCallback, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useList } from 'react-use';

import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { calcTotalMegaBytes, megaBytesToBytes } from '../../utils/files';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { Progress } from '../Progress';
import DraggableView from './DraggableView';
import DroppableView from './DroppableView';
import { removeDups, reorder } from './utils';

type Props = {
    files: Array<File>;
    maxMegaBytes?: number;
    onSave: (files: Array<File>) => void;
};

const MediaDropzone = ({ files, maxMegaBytes = 3, onSave }: Props) => {
    const [fileList, { push, clear, set, removeAt }] = useList<File>(files);
    const [errorList, { push: pushError }] = useList<string>([]);
    const [totalMb, setTotalMb] = useState<number>(calcTotalMegaBytes(files));

    const dropCb = useCallback(
        (filesAccepted: Array<File>) => {
            const newFiles = removeDups(filesAccepted, fileList);
            push(...newFiles);
        },
        [fileList, push]
    );

    const dropRejectedCb = useCallback(
        (fileRejections: Array<FileRejection>) => {
            const allErrors = fileRejections
                .map((fr) => fr.errors.map((err) => err.code))
                .flat();
            const uniqueErrors = allErrors.filter(
                (err, index) => allErrors.indexOf(err) === index
            );
            pushError(...uniqueErrors);
            const newFiles = removeDups(
                fileRejections.map((fr) => fr.file),
                fileList
            );
            push(...newFiles);
        },
        [fileList, push, pushError]
    );

    const {
        getRootProps, //
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDrop: dropCb,
        onDropRejected: dropRejectedCb,
        accept: {
            'image/jpeg': ['.jpeg', '.JPEG'],
            'image/png': ['.png', '.PNG'],
        },
        maxSize: megaBytesToBytes(1),
    });

    useUpdateEffect(() => {
        setTotalMb(calcTotalMegaBytes(fileList));
    }, [fileList]);

    const dragEndCb = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;
            const newFileList = reorder(
                fileList,
                result.source.index,
                result.destination.index
            );
            set(newFileList);
        },
        [fileList, set]
    );

    const saveCb = useCallback(() => {
        onSave(fileList);
    }, [fileList, onSave]);

    const pctProgress = Number((totalMb / maxMegaBytes).toFixed(1));
    const lblProgress = `${totalMb.toFixed(1)} MB / ${maxMegaBytes.toFixed(
        1
    )} MB`;
    const hasExceededMax = totalMb - maxMegaBytes > 0;
    const hasFiles = fileList.length > 0;
    const hasErrors = errorList.length > 0;

    return (
        <div id="media-dropzone">
            <div
                {...getRootProps()}
                className={`w-full flex flex-col items-center justify-center border border-dashed p-4 cursor-pointer transition-all duration-200 ease-in-out ${
                    isDragActive ? 'text-primary' : 'text-placeholder'
                }`}
            >
                <input {...getInputProps()} />
                <PhotoIcon className="h-10" />
                <span className="text-sm text-center">
                    Arraste e solte aqui ou clique para selecionar.
                </span>
                <span className="text-xs text-center">
                    PNG ou JPEG (até 1MB).
                </span>
            </div>
            {(hasFiles || hasErrors) && (
                <div className="border-r border-b border-l bg-bg">
                    <div className="flex flex-col items-stretch sm:flex-row sm:items-center p-4">
                        <div className="flex mb-4 sm:mb-0">
                            <Button
                                icon={<ArrowUpIcon className="h-4" />}
                                onClick={saveCb}
                                size="sm"
                                className="mr-4"
                                disabled={hasExceededMax}
                            >
                                salvar
                            </Button>
                            <Button
                                icon={<XMarkIcon className="h-4" />}
                                variant="outlined"
                                onClick={clear}
                                size="sm"
                                className="mr-4"
                            >
                                cancelar
                            </Button>
                        </div>
                        <div className="w-full sm:flex-1">
                            <Progress
                                value={hasExceededMax ? 1 : pctProgress}
                                label={lblProgress}
                                bg={
                                    hasExceededMax
                                        ? 'warning'
                                        : hasErrors
                                        ? 'error'
                                        : 'primary'
                                }
                            />
                        </div>
                    </div>
                    {hasExceededMax && (
                        <Alert
                            isInline
                            size="sm"
                            title="Atencao."
                            type="warning"
                        >
                            Capacidade maxima atingida.
                        </Alert>
                    )}
                    {hasErrors && (
                        <Alert size="sm" title="Erro." type="danger">
                            {errorList.join(' ')}
                        </Alert>
                    )}
                    <DragDropContext onDragEnd={dragEndCb}>
                        <DroppableView>
                            {fileList.map((file, index) => {
                                const id = file.name;
                                return (
                                    <DraggableView
                                        key={id}
                                        draggableId={id}
                                        file={file}
                                        index={index}
                                        onRemove={removeAt}
                                    />
                                );
                            })}
                        </DroppableView>
                    </DragDropContext>
                </div>
            )}
        </div>
    );
};

export default memo(MediaDropzone);
