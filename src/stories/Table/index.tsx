import { memo } from 'react';

export type Column = {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    nopadding?: boolean;
};

export type Row = Record<string, string | React.ReactNode>;

export type TableProps = {
    layout?: 'auto' | 'fixed';
    className?: string;
    columns: Column[];
    rows: Row[];
    striped?: boolean;
    divide: boolean;
};

const Table = ({
    layout = 'auto',
    className = '',
    columns,
    rows,
    striped = false,
    divide = false,
}: TableProps) => {
    const divider = divide ? 'divide-y' : null;
    const tableStyles = `table-${layout} ${className}`;
    const tbodyStyles = `${divider}`;

    return (
        <table className={tableStyles}>
            <thead>
                <tr>
                    {columns.map((col) => {
                        const { key, label, align } = col;
                        const alignment =
                            !align || align === 'center'
                                ? 'text-center'
                                : align === 'left'
                                ? 'text-start'
                                : 'text-end';
                        return (
                            <th key={`th-${key}`} className={`${alignment}`}>
                                {label}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody className={tbodyStyles}>
                {rows.map((row, index) => {
                    const bg =
                        !striped || index % 2 !== 0 ? 'bg-white' : 'bg-bg';
                    return (
                        <tr key={`tr-${index}`} className={`${bg}`}>
                            {columns.map((col, colIndex) => {
                                const { key, nopadding } = col;
                                const padding = !!nopadding
                                    ? 'p-0'
                                    : 'px-6 py-3';
                                return (
                                    <td
                                        key={`td-${key}-${index}-${colIndex}`}
                                        className={`${padding}`}
                                    >
                                        {row[key]}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default memo(Table);
