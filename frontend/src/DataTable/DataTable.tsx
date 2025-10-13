import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnFilteringProps,
  ColumnSortingProps,
  ColumnVisibilityProps,
  ExportProps,
  PaginationProps,
  RowExpansionProps,
  RowSelectionProps,
  RowWithSubRows
} from "@/DataTable/types";
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
  type RowData,
  type TableOptions,
  useReactTable
} from "@tanstack/react-table";
import { ArrowDownNarrowWide, ArrowDownUp, ArrowUpWideNarrow } from "lucide-react";
import { Fragment, useState } from "react";
import DefaultCheckboxColumn from "./DefaultCheckboxColumn";
import DefaultExpanderColumn from "./DefaultExpanderColumn";
import DefaultTextFilter from "./DefaultTextFilter";

interface BaseProps<TData extends RowData> {
  bordered?: boolean;
  columns: ColumnDef<TData>[];
  data: TData[];
  striped?: boolean;
}

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
  EXPAND: "expander"
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
                                                                           pageSize,
                                                                           rowSelection,
                                                                           selectionFilterFn,
                                                                           setRowSelection
                                                                           // sheetName = "Data",
                                                                           // stretchToFitWidth = false,
                                                                           // striped = true,
                                                                         }: DataTableProps<TData>) => {
  const getSubRows = (row: TData) => row.subRows;
  const hasSubRows = !!data.find(getSubRows);

  // const showFooter = isPaginationEnabled || isExportEnabled;

  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility
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
      onColumnVisibilityChange: setColumnVisibility
    }),
    ...((isRowExpansionEnabled || hasSubRows) && {
      autoResetExpanded,
      getExpandedRowModel: getExpandedRowModel()
    }),
    ...(isColumnFilteringEnabled && {
      getFilteredRowModel: getFilteredRowModel()
    }),
    ...(isPaginationEnabled && {
      getPaginationRowModel: getPaginationRowModel()
    }),
    ...(isColumnSortingEnabled && {
      getSortedRowModel: getSortedRowModel(),
      sortDescFirst: true,
      enableMultiSort: isMultiSort
    }),
    ...(isColumnFilteringEnabled &&
      isFaceted && {
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
      }),
    ...(isRowSelectionEnabled && {
      getRowId,
      onRowSelectionChange: setRowSelection
    }),
    initialState: {
      ...(isPaginationEnabled && {
        pagination: {
          pageSize: pageSize || DEFAULT_PAGE_SIZE
        }
      }),
      ...(isColumnSortingEnabled &&
        initialSortingState && { sorting: initialSortingState })
    },
    state: {
      ...(isColumnVisibilityEnabled && { columnVisibility }),
      ...(isRowSelectionEnabled && { rowSelection })
    }
  };

  const helper = createColumnHelper<TData>();

  if (isRowSelectionEnabled) {
    if (!columns.find((column) => column.id === DEFAULT_COLUMN_IDS.SELECT)) {
      columns.unshift(
        helper.display(DefaultCheckboxColumn({ isPaginationEnabled }))
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
    toggleAllRowsExpanded
  } = useReactTable(options);

  // Workaround to prevent erroneously rendering footer when not in ColumnDef
  // See: https://github.com/TanStack/table/discussions/5023#discussioncomment-8572450
  const footers = getFooterGroups()
    .map((group) =>
      group.headers.map((header) => header.column.columnDef.footer)
    )
    .flat()
    .filter(Boolean);

  if (isRowExpansionEnabled || hasSubRows) {
    if (isInitiallyExpanded) toggleAllRowsExpanded(true);
  }

  return (
    <Table style={{ color: "var(--table-text)" }}>
      <TableHeader
        className="sticky top-0 z-10"
        style={{ backgroundColor: "var(--table-header-bg)" }}
      >
        {getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { column, getContext, getSize, id, isPlaceholder } = header;
              const {
                columnDef,
                getCanFilter,
                getCanSort,
                getToggleSortingHandler
              } = column;

              return (
                <TableHead
                  colSpan={header.colSpan || 1}
                  key={`header_${id}`}
                  style={{
                    ...(getSize() && { width: getSize() })
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
                              )
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
                              getContext()
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
      <TableBody className="z-0">
        {getRowModel().rows.map((row, index) => {
          return (
            <Fragment key={`body_${row.id}`}>
              <TableRow
                style={{
                  backgroundColor:
                    index % 2 !== 0
                      ? "var(--table-row-odd-bg)"
                      : "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--table-row-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    index % 2 !== 0 ? "var(--table-row-odd-bg)" : "transparent";
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
                  <TableRow
                    style={{
                      backgroundColor: "var(--table-row-odd-bg)"
                    }}
                  >
                    <TableCell
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
          className="sticky bottom-0 border-none"
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
                     columnDef: { footer }
                   }
                 }) => (
                  <TableHead colSpan={colSpan || 1} key={`footer_${id}`}>
                    {isPlaceholder ? null : flexRender(footer, getContext())}
                  </TableHead>
                )
              )}
            </TableRow>
          ))}
        </TableFooter>
      )}
    </Table>
  );
};
