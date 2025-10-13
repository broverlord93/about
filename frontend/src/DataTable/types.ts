import {
  type OnChangeFn,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type VisibilityState
} from "@tanstack/react-table";
import { type JSX } from "react";


export type RowWithSubRows<Type> = { subRows?: Type[] };

export type TableData<Type extends RowData> = Type & RowWithSubRows<Type>;

interface ColumnFilteringEnabled {
  isColumnFilteringEnabled: true;
  isFaceted?: boolean;
}

interface ColumnFilteringDisabled {
  isColumnFilteringEnabled?: false;
  isFaceted?: never;
}

export type ColumnFilteringProps =
  | ColumnFilteringEnabled
  | ColumnFilteringDisabled;

interface ColumnSortingEnabled {
  isColumnSortingEnabled: true;
  isMultiSort?: boolean;
  initialSortingState?: SortingState;
}

interface ColumnSortingDisabled {
  isColumnSortingEnabled?: false;
  isMultiSort?: never;
  initialSortingState?: never;
}

export type ColumnSortingProps = ColumnSortingEnabled | ColumnSortingDisabled;

interface ColumnVisibilityEnabled {
  isColumnVisibilityEnabled: true;
  canUserControlVisibility?: boolean;
  initialColumnVisibility?: VisibilityState;
}

interface ColumnVisibilityDisabled {
  isColumnVisibilityEnabled?: false;
  canUserControlVisibility?: never;
  initialColumnVisibility?: never;
}

export type ColumnVisibilityProps =
  | ColumnVisibilityEnabled
  | ColumnVisibilityDisabled;

interface ExportEnabled {
  isExportEnabled: true;
  fileName?: string;
  sheetName?: string;
}

interface ExportDisabled {
  isExportEnabled?: false;
  fileName?: never;
  sheetName?: never;
}

export type ExportProps = ExportEnabled | ExportDisabled;

interface PaginationEnabled {
  isPaginationEnabled: true;
  pageSize?: number;
}

interface PaginationDisabled {
  isPaginationEnabled?: false;
  pageSize?: never;
}

export type PaginationProps = PaginationEnabled | PaginationDisabled;

interface RowExpansionEnabled<TData> {
  isRowExpansionEnabled: true;
  autoResetExpanded?: boolean;
  isInitiallyExpanded?: boolean;
  expandedRowComponent?: (row: Row<TData>) => JSX.Element;
}

interface RowExpansionDisabled {
  isRowExpansionEnabled?: false;
  autoResetExpanded?: never;
  isInitiallyExpanded?: never;
  expandedRowComponent?: never;
}

export type RowExpansionProps<TData> =
  | RowExpansionEnabled<TData>
  | RowExpansionDisabled;

interface RowSelectionEnabled<TData> {
  getRowId?: (originalRow: TData) => string;
  isRowSelectionEnabled: true;
  setRowSelection: OnChangeFn<RowSelectionState>;
  rowSelection: RowSelectionState;
  selectionFilterFn?: (row: Row<TData>) => boolean;
}

interface RowSelectionDisabled {
  getRowId?: never;
  isRowSelectionEnabled?: boolean;
  setRowSelection?: never;
  rowSelection?: never;
  selectionFilterFn?: never;
}

export type RowSelectionProps<TData> =
  | RowSelectionEnabled<TData>
  | RowSelectionDisabled;