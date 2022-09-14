export const reorder = (
    list: Array<any>,
    startIndex: number,
    endIndex: number
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const removeDups = (source: Array<File>, target: Array<File>) =>
    source.filter(
        (file, index) =>
            target.map((file) => file.name).indexOf(file.name) !== index
    );
