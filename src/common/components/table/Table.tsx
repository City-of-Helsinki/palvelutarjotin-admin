import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import React, { ReactElement, useState } from 'react';

import styles from './table.module.scss';
import { ExtendedColumnDef, ExtendedRow } from './types';

type Props<D extends Record<string, unknown>> = {
  columns: Array<ColumnDef<D>>;
  data: Array<D>;
  expandedAreaOffset?: number;
  onRowClick?: (row: ExtendedRow<D>) => void;
  renderExpandedArea?: (row: D) => React.ReactElement;
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
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(expanded)
          : updaterOrValue;
      setExpanded(newValue);
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const { getHeaderGroups, getRowModel } = table;

  // Render the UI for your table
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={tableHeaderRowClassName}>
              {headerGroup.headers.map((header) => {
                const { className, style } =
                  (header.column.columnDef as ExtendedColumnDef<D>) || {};
                return (
                  <th key={header.id} style={style} className={className}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => {
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
              <React.Fragment key={row.id}>
                <tr
                  className={classNames({
                    [styles.clickableRow]: onRowClick,
                    [styles.expandedRow]: row.getIsExpanded(),
                  })}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  tabIndex={onRowClick ? 0 : -1}
                >
                  {row.getVisibleCells().map((cell) => {
                    const { className, style } =
                      (cell.column.columnDef as ExtendedColumnDef<D>) || {};
                    return (
                      <td key={cell.id} style={style} className={className}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
                {row.getIsExpanded() && (
                  <tr className={styles.expandedArea}>
                    {expandedAreaOffset > 0 && (
                      <td colSpan={expandedAreaOffset}></td>
                    )}
                    <td
                      colSpan={
                        row.getVisibleCells().length - expandedAreaOffset
                      }
                    >
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
