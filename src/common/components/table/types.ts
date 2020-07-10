import {
  Cell,
  ColumnInstance,
  HeaderGroup,
  Row,
  UseExpandedRowProps,
} from 'react-table';

type StyleProps = {
  className?: string;
  style?: React.CSSProperties;
};

type ExtendedColumnInstance<D extends Record<string, unknown>> = ColumnInstance<
  D
> &
  StyleProps;

export type ExtendedCell<D extends Record<string, unknown>> = Cell<D, any> & {
  column: ExtendedColumnInstance<D>;
};

export type ExtendedHeaderGroup<
  D extends Record<string, unknown>
> = HeaderGroup<D> & StyleProps;

export type ExtendedRow<D extends Record<string, unknown>> = Row<D> & {
  isExpanded?: boolean;
};

export type UseExpandedColumnCell<D extends Record<string, unknown>> = {
  value: D;
  row: UseExpandedRowProps<D>;
};
