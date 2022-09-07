import { PhotoIcon } from '@heroicons/react/24/solid';
import { memo, useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useList } from 'react-use';

import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { calcTotalMegaBytes, megaBytesToBytes } from '../../utils/files';
import { Button } from '../Button';
import { Progress } from '../Progress';

type Props = {
    files: Array<File>;
    maxMegaBytes?: number;
    onChange: (files: Array<File>) => void;
    onError: (errors: Array<string>) => void;
};

const MediaDropzone = ({
    files,
    maxMegaBytes = 3,
    onChange,
    onError,
}: Props) => {
    const [fileList, { push, clear }] = useList<File>(files);
    const [totalMb, setTotalMb] = useState<number>(calcTotalMegaBytes(files));

    const dropAcceptedCb = useCallback(
        (filesAccepted: Array<File>) => {
            // Prevent duplicated files
            const newFiles = filesAccepted.filter(
                (file, index) =>
                    fileList.map((file) => file.name).indexOf(file.name) !==
                    index
            );
            const sum = totalMb + calcTotalMegaBytes(newFiles);
            if (sum > maxMegaBytes) {
                onError(['max-exceeded']);
                return;
            }
            push(...newFiles);
        },
        [fileList, maxMegaBytes, onError, push, totalMb]
    );

    const dropRejectedCb = useCallback(
        (fileRejections: Array<FileRejection>) => {
            const allErrors = fileRejections
                .map((fr) => fr.errors.map((err) => err.code))
                .flat();
            const uniqueErrors = allErrors.filter(
                (err, index) => allErrors.indexOf(err) === index
            );
            onError(uniqueErrors);
        },
        [onError]
    );

    const {
        getRootProps, //
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDropAccepted: dropAcceptedCb,
        onDropRejected: dropRejectedCb,
        accept: {
            'image/jpeg': ['.jpeg', '.JPEG'],
            'image/png': ['.png', '.PNG'],
        },
        maxSize: megaBytesToBytes(1),
    });

    useUpdateEffect(() => {
        setTotalMb(calcTotalMegaBytes(fileList));
        onChange(fileList);
    }, [fileList]);

    const pct = Number((totalMb / maxMegaBytes).toFixed(1));
    const label = `${totalMb.toFixed(1)}MB / ${maxMegaBytes.toFixed(1)}MB`;

    return (
        <div>
            <div
                {...getRootProps()}
                className={`w-full flex flex-col items-center justify-center border border-dashed p-4 cursor-pointer text-placeholder ${
                    isDragActive ? 'bg-primary-washed-out' : 'bg-bg'
                }`}
            >
                <input {...getInputProps()} />
                <PhotoIcon className="h-10" />
                <span className="text-sm">
                    Arraste e solte aqui ou clique para selecionar.
                </span>
                <span className="text-xs">PNG ou JPEG (até 1MB).</span>
            </div>
            <div className="border-r border-b border-l flex flex-col items-stretch justify-start">
                <div className="flex items-center p-4 gap-4 w-full">
                    <div className="w-96">
                        <Progress value={pct} label={label} />
                    </div>
                    <Button
                        variant="transparent"
                        onClick={clear}
                        size="sm"
                        disabled={fileList.length === 0}
                    >
                        limpar
                    </Button>
                </div>
                <ul>
                    {fileList.map((file, index) => (
                        <li key={`${file.name}-${index}`}>{file.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default memo(MediaDropzone);
