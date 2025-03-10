import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@lib/utils";
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpWideNarrow,
} from "lucide-react";
import { Fragment, JSX, useEffect, useState } from "react";
import DefaultCheckboxColumn from "./DefaultCheckboxColumn";
import DefaultExpanderColumn from "./DefaultExpanderColumn";
import DefaultTextFilter from "./DefaultTextFilter";

type RowWithSubRows<Type> = { subRows?: Type[] };

export type TableData<Type extends RowData> = Type & RowWithSubRows<Type>;

interface BaseProps<TData extends RowData> {
  bordered?: boolean;
  columns: ColumnDef<TData>[];
  data: TData[];
  maxHeight?: number;
  striped?: boolean;
  stretchToFitWidth?: boolean;
  refreshUnexpandedState?: boolean;
  // Style overrides
  bodyClassName?: string;
  cellClassName?: string;
  className?: string;
  footerClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
}

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

export type DataTableProps<TData extends RowData & RowWithSubRows<TData>> =
  BaseProps<TData> &
    ColumnFilteringProps &
    ColumnVisibilityProps &
    ColumnSortingProps &
    ExportProps &
    PaginationProps &
    RowExpansionProps<TData> &
    RowSelectionProps<TData>;

const DEFAULT_COLUMN_IDS = {
  SELECT: "select",
  EXPAND: "expander",
} as const;

const DEFAULT_PAGE_SIZE = 50;

export const DataTable = <TData extends RowData & RowWithSubRows<TData>>({
  autoResetExpanded = true,
  // canUserControlVisibility = true,
  columns,
  data,
  expandedRowComponent,
  // fileName = "Downloaded-Data",
  getRowId,
  // hover = false,
  initialColumnVisibility = {},
  initialSortingState,
  isColumnVisibilityEnabled = false,
  // isExportEnabled = false,
  isRowExpansionEnabled = false,
  isFaceted = false,
  isColumnFilteringEnabled = false,
  isInitiallyExpanded = false,
  isPaginationEnabled = false,
  isRowSelectionEnabled = false,
  isColumnSortingEnabled = false,
  isMultiSort = true,
  // maxHeight,
  pageSize,
  refreshUnexpandedState = true,
  rowSelection,
  selectionFilterFn,
  setRowSelection,
  // sheetName = "Data",
  // stretchToFitWidth = false,
  // striped = true,
  bodyClassName = "",
  cellClassName = "",
  className = "",
  footerClassName = "",
  headerClassName = "",
  rowClassName = "",
}: DataTableProps<TData>) => {
  const getSubRows = (row: TData) => row.subRows;
  const hasSubRows = !!data.find(getSubRows);

  // const showFooter = isPaginationEnabled || isExportEnabled;

  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility,
  );

  const options: TableOptions<TData> = {
    columns,
    data,
    enableRowSelection: isRowSelectionEnabled
      ? (selectionFilterFn ?? true)
      : false,
    enableSorting: isColumnSortingEnabled,
    getSubRows,
    getCoreRowModel: getCoreRowModel(),
    ...(isColumnVisibilityEnabled && {
      onColumnVisibilityChange: setColumnVisibility,
    }),
    ...((isRowExpansionEnabled || hasSubRows) && {
      autoResetExpanded,
      getExpandedRowModel: getExpandedRowModel(),
    }),
    ...(isColumnFilteringEnabled && {
      getFilteredRowModel: getFilteredRowModel(),
    }),
    ...(isPaginationEnabled && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...(isColumnSortingEnabled && {
      getSortedRowModel: getSortedRowModel(),
      sortDescFirst: true,
      enableMultiSort: isMultiSort,
    }),
    ...(isColumnFilteringEnabled &&
      isFaceted && {
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
      }),
    ...(isRowSelectionEnabled && {
      getRowId,
      onRowSelectionChange: setRowSelection,
    }),
    initialState: {
      ...(isPaginationEnabled && {
        pagination: {
          pageSize: pageSize || DEFAULT_PAGE_SIZE,
        },
      }),
      ...(isColumnSortingEnabled &&
        initialSortingState && { sorting: initialSortingState }),
    },
    state: {
      ...(isColumnVisibilityEnabled && { columnVisibility }),
      ...(isRowSelectionEnabled && { rowSelection }),
    },
  };

  const helper = createColumnHelper<TData>();

  if (isRowSelectionEnabled) {
    if (!columns.find((column) => column.id === DEFAULT_COLUMN_IDS.SELECT)) {
      columns.unshift(
        helper.display(DefaultCheckboxColumn({ isPaginationEnabled })),
      );
    }
  }

  if (isRowExpansionEnabled || hasSubRows) {
    if (!columns.find((column) => column.id === DEFAULT_COLUMN_IDS.EXPAND)) {
      columns.unshift(helper.display(DefaultExpanderColumn()));
    }
  }

  const {
    // firstPage,
    // getAllLeafColumns,
    // getCanNextPage,
    // getCanPreviousPage,
    getFooterGroups,
    getHeaderGroups,
    // getPageCount,
    getRowModel,
    // getState,
    // getTotalSize,
    // lastPage,
    // nextPage,
    // previousPage,
    // setPageSize,
    // setPageIndex,
    toggleAllRowsExpanded,
  } = useReactTable(options);

  // Workaround to prevent erroneously rendering footer when not in ColumnDef
  // See: https://github.com/TanStack/table/discussions/5023#discussioncomment-8572450
  const footers = getFooterGroups()
    .map((group) =>
      group.headers.map((header) => header.column.columnDef.footer),
    )
    .flat()
    .filter(Boolean);

  if (isRowExpansionEnabled || hasSubRows) {
    if (isInitiallyExpanded) toggleAllRowsExpanded(true);
  }

  useEffect(() => {
    toggleAllRowsExpanded(false);
  }, [refreshUnexpandedState, toggleAllRowsExpanded]);

  return (
    <Table className={className}>
      <TableHeader className={cn("sticky top-0 z-10", headerClassName)}>
        {getHeaderGroups().map((headerGroup) => (
          <TableRow className={rowClassName} key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { column, getContext, getSize, id, isPlaceholder } = header;
              const {
                columnDef,
                getCanFilter,
                getCanSort,
                getToggleSortingHandler,
              } = column;

              return (
                <TableHead
                  colSpan={header.colSpan || 1}
                  key={`header_${id}`}
                  style={{
                    ...(getSize() && { width: getSize() }),
                  }}
                >
                  {isPlaceholder ? null : (
                    <>
                      <div
                        className={
                          getCanSort() ? "cursor-pointer select-none" : ""
                        }
                        onClick={getToggleSortingHandler()}
                      >
                        <div>{flexRender(columnDef.header, getContext())}</div>
                        {isColumnSortingEnabled && getCanSort() ? (
                          <div className={"text-end"}>
                            {{
                              asc: (
                                <span>
                                  <ArrowUpWideNarrow />
                                </span>
                              ),
                              desc: (
                                <span>
                                  <ArrowDownNarrowWide />
                                </span>
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <span>
                                <ArrowDownUp />
                              </span>
                            )}
                          </div>
                        ) : null}
                      </div>
                      {isColumnFilteringEnabled && getCanFilter() ? (
                        columnDef.meta?.Filter ? (
                          <div>
                            {flexRender(
                              columnDef.meta.Filter({ column }),
                              getContext(),
                            )}
                          </div>
                        ) : (
                          <div>
                            <DefaultTextFilter column={column} />
                          </div>
                        )
                      ) : null}
                    </>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className={cn("z-0", bodyClassName)}>
        {getRowModel().rows.map((row) => {
          return (
            <Fragment key={`body_${row.id}`}>
              <TableRow className={rowClassName}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={cellClassName} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
              {/* row.getCanExpand() returns false if no subRows are provided.
               * If subRows exists, tanstack table will handle rendering
               */}
              {row.getCanExpand()
                ? null
                : expandedRowComponent &&
                  row.getIsExpanded() && (
                    <TableRow className={rowClassName}>
                      <TableCell
                        className={cellClassName}
                        colSpan={row.getVisibleCells().length}
                      >
                        {(() => {
                          return expandedRowComponent(row);
                        })()}
                      </TableCell>
                    </TableRow>
                  )}
            </Fragment>
          );
        })}
      </TableBody>
      {footers.length > 0 && (
        <TableFooter
          className={cn("sticky bottom-0 border-none", footerClassName)}
        >
          {getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map(
                ({
                  getContext,
                  id,
                  isPlaceholder,
                  colSpan,
                  column: {
                    columnDef: { footer },
                  },
                }) => (
                  <TableHead colSpan={colSpan || 1} key={`footer_${id}`}>
                    {isPlaceholder ? null : flexRender(footer, getContext())}
                  </TableHead>
                ),
              )}
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Table>
  );
};
