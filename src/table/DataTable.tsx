// import {
//   type ColumnDef,
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getExpandedRowModel,
//   getFacetedMinMaxValues,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   type HeaderGroup,
//   type OnChangeFn,
//   type Row as TableRow,
//   type RowData,
//   type RowSelectionState,
//   type SortingState,
//   type TableOptions,
//   useReactTable,
//   type VisibilityState,
// } from "@tanstack/react-table";
// import { type CSSProperties, Fragment, JSX, useState, useEffect } from "react";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Col,
//   Container,
//   Label,
//   Row,
//   Table,
// } from "reactstrap";
// import DefaultCheckboxColumn from "./DefaultCheckboxColumn";
// import DefaultExpanderColumn from "./DefaultExpanderColumn";
// import DefaultTextFilter from "./DefaultTextFilter";
// import ExportTable from "./ExportTable";
// import Pagination from "./Pagination";
// import Icon from "@mdi/react";
// import {
//   mdiSortAscending,
//   mdiSortDescending,
//   mdiSortReverseVariant,
// } from "@mdi/js";
// import type { ButtonDisplay, Variant } from "@types";
// import Select from "react-select";
// import { ExpandRowTracker } from "@helpers/tracking_template";
//
// type RowWithSubRows<Type> = { subRows?: Type[] };
//
// export type TableData<Type extends RowData> = Type & RowWithSubRows<Type>;
//
// interface RowStyleOverrideByIndex {
//   accessorKey?: never;
//   styles: Map<number, CSSProperties>;
// }
//
// interface RowStyleOverrideByColumnValue<TData> {
//   accessorKey: keyof TData;
//   styles: Map<TData[keyof TData], CSSProperties>;
// }
//
// type RowStyleOverride<TData> =
//   | RowStyleOverrideByIndex
//   | RowStyleOverrideByColumnValue<TData>;
//
// interface BaseProps<TData extends RowData> {
//   bordered?: boolean;
//   columns: ColumnDef<TData>[];
//   data: TData[];
//   hover?: boolean;
//   maxHeight?: number;
//   rowStyleOverride?: RowStyleOverride<TData>;
//   striped?: boolean;
//   variant?: Variant;
//   tableName?: string;
//   stretchToFitWidth?: boolean;
//   refreshUnexpandedState?: boolean;
// }
//
// interface ColumnFilteringEnabled {
//   isColumnFilteringEnabled: true;
//   isFaceted?: boolean;
// }
//
// interface ColumnFilteringDisabled {
//   isColumnFilteringEnabled?: false;
//   isFaceted?: never;
// }
//
// export type ColumnFilteringProps =
//   | ColumnFilteringEnabled
//   | ColumnFilteringDisabled;
//
// interface ColumnOption {
//   label: string;
//   value: string;
// }
//
// interface ColumnSortingEnabled {
//   isColumnSortingEnabled: true;
//   isMultiSort?: boolean;
//   initialSortingState?: SortingState;
// }
//
// interface ColumnSortingDisabled {
//   isColumnSortingEnabled?: false;
//   isMultiSort?: never;
//   initialSortingState?: never;
// }
//
// export type ColumnSortingProps = ColumnSortingEnabled | ColumnSortingDisabled;
//
// interface ColumnVisibilityEnabled {
//   isColumnVisibilityEnabled: true;
//   canUserControlVisibility?: boolean;
//   initialColumnVisibility?: VisibilityState;
// }
//
// interface ColumnVisibilityDisabled {
//   isColumnVisibilityEnabled?: false;
//   canUserControlVisibility?: never;
//   initialColumnVisibility?: never;
// }
//
// export type ColumnVisibilityProps =
//   | ColumnVisibilityEnabled
//   | ColumnVisibilityDisabled;
//
// interface ExportEnabled {
//   isExportEnabled: true;
//   fileName?: string;
//   sheetName?: string;
// }
//
// interface ExportDisabled {
//   isExportEnabled?: false;
//   fileName?: never;
//   sheetName?: never;
// }
//
// export type ExportProps = (ExportEnabled | ExportDisabled) &
//   Omit<ButtonDisplay, "variant">;
//
// interface PaginationEnabled {
//   isPaginationEnabled: true;
//   pageSize?: number;
// }
//
// interface PaginationDisabled {
//   isPaginationEnabled?: false;
//   pageSize?: never;
// }
//
// export type PaginationProps = (PaginationEnabled | PaginationDisabled) &
//   Omit<ButtonDisplay, "variant">;
//
// interface RowExpansionEnabled<TData> {
//   isRowExpansionEnabled: true;
//   autoResetExpanded?: boolean;
//   isInitiallyExpanded?: boolean;
//   expandedRowComponent?: (row: TableRow<TData>) => JSX.Element;
// }
//
// interface RowExpansionDisabled {
//   isRowExpansionEnabled?: false;
//   autoResetExpanded?: never;
//   isInitiallyExpanded?: never;
//   expandedRowComponent?: never;
// }
//
// export type RowExpansionProps<TData> =
//   | RowExpansionEnabled<TData>
//   | RowExpansionDisabled;
//
// interface RowSelectionEnabled<TData> {
//   getRowId?: (originalRow: TData) => string;
//   isRowSelectionEnabled: true;
//   setRowSelection: OnChangeFn<RowSelectionState>;
//   rowSelection: RowSelectionState;
//   selectionFilterFn?: (row: TableRow<TData>) => boolean;
// }
//
// interface RowSelectionDisabled {
//   getRowId?: never;
//   isRowSelectionEnabled?: boolean;
//   setRowSelection?: never;
//   rowSelection?: never;
//   selectionFilterFn?: never;
// }
//
// export type RowSelectionProps<TData> =
//   | RowSelectionEnabled<TData>
//   | RowSelectionDisabled;
//
// export type DataTableProps<TData extends RowData & RowWithSubRows<TData>> =
//   BaseProps<TData> &
//   ColumnFilteringProps &
//   ColumnVisibilityProps &
//   ColumnSortingProps &
//   ExportProps &
//   PaginationProps &
//   RowExpansionProps<TData> &
//   RowSelectionProps<TData>;
//
// const DEFAULT_COLUMN_IDS = {
//   SELECT: "select",
//   EXPAND: "expander",
// } as const;
//
// const DEFAULT_PAGE_SIZE = 50;
//
// export const DataTable = <TData extends RowData & RowWithSubRows<TData>>({
//                                                                            tableName = "",
//                                                                            autoResetExpanded = true,
//                                                                            bordered = false,
//                                                                            buttonDisplay = "icon",
//                                                                            buttonIconSize = 0.8,
//                                                                            canUserControlVisibility = true,
//                                                                            columns,
//                                                                            data,
//                                                                            expandedRowComponent,
//                                                                            fileName = "Downloaded-Data",
//                                                                            getRowId,
//                                                                            hover = false,
//                                                                            initialColumnVisibility = {},
//                                                                            initialSortingState,
//                                                                            isColumnVisibilityEnabled = false,
//                                                                            isExportEnabled = false,
//                                                                            isRowExpansionEnabled = false,
//                                                                            isFaceted = false,
//                                                                            isColumnFilteringEnabled = false,
//                                                                            isInitiallyExpanded = false,
//                                                                            isPaginationEnabled = false,
//                                                                            isRowSelectionEnabled = false,
//                                                                            isColumnSortingEnabled = false,
//                                                                            isMultiSort = true,
//                                                                            maxHeight,
//                                                                            pageSize,
//                                                                            refreshUnexpandedState = true,
//                                                                            rowStyleOverride = { styles: new Map<number, CSSProperties>() },
//                                                                            rowSelection,
//                                                                            selectionFilterFn,
//                                                                            setRowSelection,
//                                                                            sheetName = "Data",
//                                                                            stretchToFitWidth = false,
//                                                                            striped = true,
//                                                                            variant = "light",
//                                                                          }: DataTableProps<TData>) => {
//   const getSubRows = (row: TData) => row.subRows;
//   const hasSubRows = !!data.find(getSubRows);
//
//   const showFooter = isPaginationEnabled || isExportEnabled;
//
//   const [columnVisibility, setColumnVisibility] = useState(
//     initialColumnVisibility,
//   );
//
//   const options: TableOptions<TData> = {
//     columns,
//     data,
//     enableRowSelection: isRowSelectionEnabled
//       ? (selectionFilterFn ?? true)
//       : false,
//     enableSorting: isColumnSortingEnabled,
//     getSubRows,
//     getCoreRowModel: getCoreRowModel(),
//     ...(isColumnVisibilityEnabled && {
//       onColumnVisibilityChange: setColumnVisibility,
//     }),
//     ...((isRowExpansionEnabled || hasSubRows) && {
//       autoResetExpanded,
//       getExpandedRowModel: getExpandedRowModel(),
//     }),
//     ...(isColumnFilteringEnabled && {
//       getFilteredRowModel: getFilteredRowModel(),
//     }),
//     ...(isPaginationEnabled && {
//       getPaginationRowModel: getPaginationRowModel(),
//     }),
//     ...(isColumnSortingEnabled && {
//       getSortedRowModel: getSortedRowModel(),
//       sortDescFirst: true,
//       enableMultiSort: isMultiSort,
//     }),
//     ...(isColumnFilteringEnabled &&
//       isFaceted && {
//         getFacetedRowModel: getFacetedRowModel(),
//         getFacetedUniqueValues: getFacetedUniqueValues(),
//         getFacetedMinMaxValues: getFacetedMinMaxValues(),
//       }),
//     ...(isRowSelectionEnabled && {
//       getRowId,
//       onRowSelectionChange: setRowSelection,
//     }),
//     initialState: {
//       ...(isPaginationEnabled && {
//         pagination: {
//           pageSize: pageSize || DEFAULT_PAGE_SIZE,
//         },
//       }),
//       ...(isColumnSortingEnabled &&
//         initialSortingState && { sorting: initialSortingState }),
//     },
//     state: {
//       ...(isColumnVisibilityEnabled && { columnVisibility }),
//       ...(isRowSelectionEnabled && { rowSelection }),
//     },
//   };
//
//   const helper = createColumnHelper<TData>();
//
//   if (isRowSelectionEnabled) {
//     if (!columns.find((column) => column.id === DEFAULT_COLUMN_IDS.SELECT)) {
//       columns.unshift(
//         helper.display(DefaultCheckboxColumn({ isPaginationEnabled })),
//       );
//     }
//   }
//
//   if (isRowExpansionEnabled || hasSubRows) {
//     if (!columns.find((column) => column.id === DEFAULT_COLUMN_IDS.EXPAND)) {
//       columns.unshift(helper.display(DefaultExpanderColumn()));
//     }
//   }
//
//   const {
//     firstPage,
//     getAllLeafColumns,
//     getCanNextPage,
//     getCanPreviousPage,
//     getFooterGroups,
//     getHeaderGroups,
//     getPageCount,
//     getRowModel,
//     getState,
//     getTotalSize,
//     lastPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     setPageIndex,
//     toggleAllRowsExpanded,
//   } = useReactTable(options);
//
//   const columnMap = new Map(
//     getAllLeafColumns().map((column) => [column.id, column]),
//   );
//   const columnOptions: ColumnOption[] = getAllLeafColumns().map(
//     ({ id, columnDef: { header } }) => {
//       const headerName = typeof header === "string" ? header : id;
//
//       return { label: headerName, value: id };
//     },
//   );
//
//   if (isRowExpansionEnabled || hasSubRows) {
//     if (isInitiallyExpanded) toggleAllRowsExpanded(true);
//   }
//
//   useEffect(() => {
//     toggleAllRowsExpanded(false);
//   }, [refreshUnexpandedState, toggleAllRowsExpanded]);
//
//   return (
//     <Card className={`bg-${variant}`}>
//   {isColumnVisibilityEnabled && canUserControlVisibility && (
//     <CardHeader>
//       <Row
//         className={"align-items-center g-0 justify-content-center w-100"}
//     >
//     <Col sm={3}>
//     <Label
//       className={"d-inline-block pe-1"}
//     for={"column-visibility-filter"}
//       >
//       Show / Hide Column:{" "}
//     </Label>
//     <Select
//     className={"d-inline-block w-75"}
//     classNames={{
//     multiValueLabel: () =>
//       `bg-${
//         variant.includes("light") ? variant : `light-${variant}`
//       }`,
//   }}
//     defaultValue={columnOptions.filter(({ value }) =>
//         columnVisibility.hasOwnProperty(value),
//       )}
//     id={"column-visibility-filter"}
//     isClearable
//     isMulti
//     options={columnOptions}
//     onChange={(options, { action, removedValue }) => {
//     if (action === "clear") {
//       columnMap.forEach((column) =>
//         column.toggleVisibility(true),
//       );
//     }
//     if (action === "select-option") {
//       for (const option of options) {
//         const column = columnMap.get(option.value);
//         column?.toggleVisibility(false);
//       }
//     }
//     if (action === "remove-value" && removedValue) {
//       const column = columnMap.get(removedValue.value);
//       column?.toggleVisibility(true);
//     }
//   }}
//     placeholder={"Hide Selected Columns..."}
//     />
//     </Col>
//     </Row>
//     </CardHeader>
//   )}
//   <CardBody style={{ overflowY: "auto" }}>
//   <Container
//     className={"overflow-auto"}
//   fluid
//   style={{
//   ...(maxHeight && { maxHeight: `${maxHeight}px` }),
//       width: stretchToFitWidth ? "100%" : getTotalSize(),
//   }}
// >
//   <Table
//     bordered={bordered}
//   className={`table-${variant} w-100`}
//   hover={hover || isRowSelectionEnabled}
//   striped={striped}
//     >
//     <thead>
//       {getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => {
//                 const { column, getContext, getSize, id, isPlaceholder } =
//                   header;
//                 const {
//                   columnDef,
//                   getCanFilter,
//                   getCanSort,
//                   getToggleSortingHandler,
//                 } = column;
//
//                 return (
//                   <th
//                     key={`header_${id}`}
//                 colSpan={header.colSpan || 1}
//                 style={{
//                   position: "sticky",
//                     top: -1,
//                 ...(getSize() && { width: getSize() }),
//                     zIndex: 69,
//                 }}
//               >
//                 {isPlaceholder ? null : (
//                   <>
//                     <Row
//                       className={
//                     getCanSort() ? "cursor-pointer select-none" : ""
//                 }
//                   onClick={getToggleSortingHandler()}
//                     >
//                     <Col>
//                       {flexRender(columnDef.header, getContext())}
//                   </Col>
//                   {isColumnSortingEnabled && getCanSort() ? (
//                     <Col className={"text-end"}>
//                       {{
//                     asc: (
//                       <span>
//                         <Icon
//                           path={mdiSortAscending}
//                     size={1.5}
//                     />
//                     </span>
//                   ),
//                     desc: (
//                       <span>
//                         <Icon
//                           path={mdiSortDescending}
//                     size={1.5}
//                     />
//                     </span>
//                   ),
//                   }[header.column.getIsSorted() as string] ?? (
//                     <span>
//                       <Icon
//                         path={mdiSortReverseVariant}
//                     size={1.5}
//                     />
//                     </span>
//                   )}
//                     </Col>
//                   ) : null}
//                   </Row>
//                   {isColumnFilteringEnabled && getCanFilter() ? (
//                     columnDef.meta?.Filter ? (
//                       <Row>
//                         {flexRender(
//                             columnDef.meta.Filter({ column }),
//                           getContext(),
//                     )}
//                     </Row>
//                   ) : (
//                     <Row>
//                       <DefaultTextFilter
//                         column={column}
//                     searchLocation={tableName}
//                     />
//                     </Row>
//                   )
//                   ) : null}
//                   </>
//                 )}
//                 </th>
//               );
//               })}
//             </tr>
//         ))}
//     </thead>
//     <tbody>
//     {getRowModel().rows.map((row) => {
//         const { index, original } = row;
//         const { accessorKey, styles } = rowStyleOverride;
//
//         const style = accessorKey
//           ? // @ts-expect-error Known type issue, this works fine
//           styles.get(original[accessorKey])
//           : // @ts-expect-error Known type issue, this works fine
//           styles.get(index);
//
//         // STILL NEED THESE LOGS FOR NOW - alimani
//
//         // console.log({
//         //   row,
//         //   original,
//         //   accessed: original[accessorKey],
//         //   style,
//         //   values,
//         //   accessorKey,
//         // });
//
//         return (
//           <Fragment key={`body_${row.id}`}>
//         <tr style={style}>
//           {row.getVisibleCells().map((cell) => (
//               <td key={cell.id}>
//                 {flexRender(
//                     cell.column.columnDef.cell,
//                   cell.getContext(),
//             )}
//           </td>
//       ))}
//         </tr>
//         {/* row.getCanExpand() returns false if no subRows are provided.
//                      * If subRows exists, tanstack table will handle rendering
//                      */}
//         {row.getCanExpand()
//           ? null
//           : expandedRowComponent &&
//           row.getIsExpanded() && (
//             <tr>
//               <td colSpan={row.getVisibleCells().length}>
//               {(() => {
//                 ExpandRowTracker(row);
//                 return expandedRowComponent(row);
//               })()}
//           </td>
//           </tr>
//         )}
//         </Fragment>
//       );
//       })}
//     </tbody>
//   {getFooterGroups().length > 0 && (
//     <tfoot>
//       {getFooterGroups().map((footerGroup) => (
//           <tr key={footerGroup.id}>
//             {footerGroup.headers.map(
//                 ({
//                    getContext,
//                    id,
//                    isPlaceholder,
//                    colSpan,
//                    column: {
//                      columnDef: { footer },
//                    },
//                  }) => (
//                   <th
//                     colSpan={colSpan || 1}
//         key={`footer_${id}`}
//     style={{
//     border: "none",
//       position: "sticky",
//       bottom: 0,
//   }}
//   >
//     {isPlaceholder
//       ? null
//       : flexRender(footer, getContext())}
//     </th>
//   ),
//   )}
//     </tr>
//   ))}
//     </tfoot>
//   )}
//   </Table>
//   </Container>
//   </CardBody>
//   {showFooter && (
//     <CardFooter>
//       <Row className={"align-items-center justify-content-between"}>
//       {isPaginationEnabled && (
//         <Col sm={11}>
//         <Pagination
//           tableName={tableName}
//     firstPage={firstPage}
//     lastPage={lastPage}
//     nextPage={nextPage}
//     previousPage={previousPage}
//     getCanNextPage={getCanNextPage}
//     getCanPreviousPage={getCanPreviousPage}
//     getPageCount={getPageCount}
//     getPageIndex={() => getState().pagination.pageIndex}
//     getRowCount={() => data.length}
//     getPageSize={() => getState().pagination.pageSize}
//     setPageIndex={setPageIndex}
//     setPageSize={setPageSize}
//     buttonDisplay={buttonDisplay}
//     {...(buttonDisplay.includes("icon") && {
//       buttonIconSize,
//     })}
//     defaultPageSize={DEFAULT_PAGE_SIZE}
//     />
//     </Col>
//   )}
//     {isExportEnabled && (
//       <Col
//         className={"align-items-center text-end"}
//       sm={isPaginationEnabled ? 1 : 12}
//       >
//       <ExportTable
//         buttonDisplay={buttonDisplay}
//       {...(buttonDisplay.includes("icon") && {
//         buttonIconSize,
//       })}
//       disabled={getRowModel().rows.length === 0}
//       fileName={fileName}
//       sheets={[
//           {
//             columns: columns as ColumnDef<RowData>[],
//             getData: async <TData,>() => {
//               const { rows } = getRowModel();
//               return rows as unknown as TableRow<TData>[];
//             },
//             headerGroups: getHeaderGroups() as HeaderGroup<unknown>[],
//             sheetName,
//           },
//     ]}
//       />
//       </Col>
//     )}
//     </Row>
//     </CardFooter>
//   )}
//   </Card>
// );
// };