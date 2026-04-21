import { Cell, ColumnDef, Header, Row, Table } from '@tanstack/react-table';

type StyleProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type ExtendedColumnDef<D extends Record<string, unknown>> =
  ColumnDef<D> & StyleProps;

export type ExtendedCell<D extends Record<string, unknown>> = Cell<D, unknown> &
  StyleProps;

export type ExtendedHeader<D extends Record<string, unknown>> = Header<
  D,
  unknown
> &
  StyleProps;

export type ExtendedRow<D extends Record<string, unknown>> = Row<D>;

export type ExtendedTable<D extends Record<string, unknown>> = Table<D>;
