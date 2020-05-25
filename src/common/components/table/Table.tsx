import classNames from 'classnames';
import React from 'react';
import { Column, Row, useTable } from 'react-table';

import styles from './table.module.scss';

type Props<D extends object> = {
  columns: Array<Column<D>>;
  data: Array<D>;
  onRowClick?: (row: Row<D>) => void;
};

export default function Table<D extends object>({
  columns,
  data,
  onRowClick,
}: Props<D>) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <div className={styles.tableWrapper}>
      <table {...getTableProps({ className: styles.table })}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);

            const handleKeyDown = (
              event: React.KeyboardEvent<HTMLTableRowElement>
            ) => {
              if (
                event.target === event.currentTarget &&
                event.key === 'Enter' &&
                onRowClick
              ) {
                onRowClick(row);
              }
            };

            return (
              <tr
                {...row.getRowProps()}
                className={classNames({ [styles.clickableRow]: onRowClick })}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                onKeyDown={handleKeyDown}
                tabIndex={onRowClick ? 0 : -1}
              >
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
