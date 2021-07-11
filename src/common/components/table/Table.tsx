import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { Column, Row, useExpanded, useTable } from 'react-table';

import styles from './table.module.scss';
import { ExtendedCell, ExtendedHeaderGroup, ExtendedRow } from './types';

type Props<D extends Record<string, unknown>> = {
  columns: Array<Column<D>>;
  data: Array<D>;
  expandedAreaOffset?: number;
  onRowClick?: (row: Row<D>) => void;
  renderExpandedArea?: (row: D) => JSX.Element;
  tableHeaderRowClassName?: string;
};

export default function Table<D extends Record<string, unknown>>({
  columns,
  data,
  expandedAreaOffset = 0,
  onRowClick,
  renderExpandedArea,
  tableHeaderRowClassName,
}: Props<D>): ReactElement {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded
  );

  // Render the UI for your table
  return (
    <div className={styles.tableWrapper}>
      <table {...getTableProps({ className: styles.table })}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                className: tableHeaderRowClassName,
              })}
            >
              {headerGroup.headers.map((column: ExtendedHeaderGroup<D>) => {
                const { style, className } = column;
                return (
                  <th {...column.getHeaderProps()} {...{ style, className }}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: ExtendedRow<D>, i) => {
            prepareRow(row);

            const handleClick = (event: React.MouseEvent) => {
              const element = event.target as HTMLElement;
              if (
                element.tagName === 'TD' &&
                event.currentTarget.contains(element) &&
                onRowClick
              ) {
                onRowClick(row);
              }
            };

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
              <React.Fragment key={row.getRowProps().key}>
                <tr
                  {...row.getRowProps()}
                  className={classNames({
                    [styles.clickableRow]: onRowClick,
                    [styles.expandedRow]: row.isExpanded,
                  })}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  tabIndex={onRowClick ? 0 : -1}
                >
                  {row.cells.map((cell: ExtendedCell<D>) => {
                    const { className, style } = cell.column;
                    return (
                      <td {...cell.getCellProps()} {...{ className, style }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr className={styles.expandedArea}>
                    {expandedAreaOffset > 0 && (
                      <td colSpan={expandedAreaOffset}></td>
                    )}
                    <td colSpan={row.cells.length - expandedAreaOffset}>
                      {renderExpandedArea && renderExpandedArea(row.original)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
