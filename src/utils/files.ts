export const bytesToMegaBytes = (bytes: number): number =>
    bytes / (1024 * 1024);

export const megaBytesToBytes = (megaBytes: number): number =>
    megaBytes * (1024 * 1024);

export const calcTotalBytes = (files: Array<File>) =>
    files.map((file) => file.size).reduce((size, acc) => size + acc, 0);

export const calcTotalMegaBytes = (files: Array<File>) =>
    bytesToMegaBytes(calcTotalBytes(files));
