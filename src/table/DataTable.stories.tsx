// import {
//   type ColumnFilteringProps,
//   type ColumnSortingProps,
//   type ColumnVisibilityProps,
//   DataTable,
//   type ExportProps,
//   type PaginationProps,
//   type RowExpansionProps,
//   RowSelectionProps,
//   type TableData,
// } from "./DataTable";
// import {
//   type ColumnDef,
//   createColumnHelper,
//   type Row,
//   type RowSelectionState,
//   type SortingState,
//   type VisibilityState,
// } from "@tanstack/react-table";
// import { type CSSProperties, useMemo, useState } from "react";
// import Select, { type ActionMeta, type SingleValue } from "react-select";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   CardTitle,
//   Container,
//   ListGroup,
//   ListGroupItem,
// } from "reactstrap";
// import type { Variant } from "@types";
//
// interface Employee {
//   id: number;
//   name: string;
//   title: string;
// }
//
// const meta = {
//   component: DataTable,
// };
//
// const dataBasic: TableData<Employee>[] = [
//   {
//     id: 1,
//     name: "Anthony Limani",
//     title: "Software Engineer",
//   },
//   {
//     id: 2,
//     name: "Dustin Johnson",
//     title: "Principal Engineer",
//   },
//   {
//     id: 3,
//     name: "Jared Burke",
//     title: "Senior Software Engineer",
//   },
//   {
//     id: 4,
//     name: "Frank Ableson",
//     title: "Chief Technology Officer",
//   },
//   {
//     id: 5,
//     name: "Samara Augustin",
//     title: "Software Engineer",
//   },
//   {
//     id: 6,
//     name: "Chris Pane",
//     title: "Minecraft Connoisseur",
//   },
//   {
//     id: 7,
//     name: "Josh Ortiga",
//     title: "VIM Enthusiast",
//   },
//   {
//     id: 8,
//     name: "Jordan Li",
//     title: "Dunno, I'm Out of Ideas ¯\\_(ツ)_/¯",
//   },
// ];
//
// const dataWithSubRows: TableData<Employee>[] = [
//   {
//     id: 1,
//     name: "Anthony Limani",
//     title: "Software Engineer",
//   },
//   {
//     id: 2,
//     name: "Dustin Johnson",
//     title: "Principal Engineer",
//   },
//   {
//     id: 3,
//     name: "Jared Burke",
//     title: "Senior Software Engineer",
//     subRows: [
//       {
//         id: 1,
//         name: "Anthony Limani",
//         title: "Software Engineer",
//       },
//       {
//         id: 5,
//         name: "Samara Augustin",
//         title: "Software Engineer",
//       },
//       {
//         id: 6,
//         name: "Chris Pane",
//         title: "Minecraft Connoisseur",
//       },
//       {
//         id: 7,
//         name: "Josh Ortiga",
//         title: "VIM Enthusiast",
//       },
//       {
//         id: 8,
//         name: "Jordan Li",
//         title: "Dunno, I'm Out of Ideas ¯\\_(ツ)_/¯",
//       },
//     ],
//   },
// ];
//
// const columnHelper = createColumnHelper<TableData<Employee>>();
//
// const makeColumns = ({
//   isExportable = false,
//   isFaceted = false,
//   canFilter = false,
// }) => {
//   const hasMeta = isExportable || canFilter;
//
//   return [
//     columnHelper.accessor("id", {
//       id: "id",
//       enableMultiSort: false,
//       filterFn: "equals",
//       header: "ID",
//       size: 500,
//       ...(hasMeta && {
//         meta: {
//           ...(isExportable && { isExportable: true }),
//           ...(canFilter && {
//             Filter: ({
//               column: {
//                 getFacetedUniqueValues,
//                 getFilterValue,
//                 setFilterValue,
//               },
//             }) => {
//               interface Option {
//                 label: number | string;
//                 value: number;
//               }
//
//               const makeOptions = (): Option[] => {
//                 if (isFaceted) {
//                   return Object.entries(getFacetedUniqueValues())
//                     .map(([key, value]: [string, number]) => ({
//                       label: key,
//                       value,
//                     }))
//                     .sort((a, b) => a.label.localeCompare(b.label));
//                 }
//
//                 return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
//                   value: id,
//                   label: id,
//                 }));
//               };
//
//               const filterValue = getFilterValue();
//
//               const options = makeOptions();
//
//               return (
//                 <Select
//                   isClearable
//                   onChange={(
//                     option: SingleValue<Option>,
//                     { action }: ActionMeta<Option>,
//                   ) => {
//                     if (action === "clear") {
//                       setFilterValue(undefined);
//                     } else if (option) {
//                       setFilterValue(option.value);
//                     }
//                   }}
//                   options={options}
//                   defaultValue={options.find(
//                     ({ value }) => value === filterValue,
//                   )}
//                 />
//               );
//             },
//           }),
//         },
//       }),
//     }),
//     columnHelper.accessor(({ name }) => name.split(" ")[0], {
//       id: "firstName",
//       header: `First Name ${canFilter ? "(Includes String)" : ""}`,
//       filterFn: "includesString",
//       cell: ({
//         row: {
//           original: { name },
//         },
//       }) => {
//         const [firstName] = name.split(" ");
//
//         return <>{firstName}</>;
//       },
//       size: 500,
//       ...(isExportable && { meta: { isExportable: true } }),
//     }),
//     columnHelper.accessor(({ name }) => name.split(" ")[1], {
//       id: "lastName",
//       header: `Last Name ${canFilter ? "(Equals String)" : ""}`,
//       filterFn: "equalsString",
//       cell: ({
//         row: {
//           original: { name },
//         },
//       }) => {
//         const [, lastName] = name.split(" ");
//
//         return <>{lastName}</>;
//       },
//       size: 500,
//       ...(isExportable && { isExportable: true }),
//     }),
//     columnHelper.accessor("title", {
//       id: "title",
//       header: `Title ${canFilter ? "(Includes String Case Sensitive)" : ""}`,
//       filterFn: "includesStringSensitive",
//       size: 500,
//       ...(isExportable && { meta: { isExportable: true } }),
//     }),
//   ] as ColumnDef<TableData<Employee>>[];
// };
//
// const expandedRowComponent = (row: Row<Employee>) => {
//   return (
//     <Card className={"bg-light-primary"}>
//       <CardHeader>
//         <CardTitle>Expanded Row Component</CardTitle>
//       </CardHeader>
//       <CardBody>
//         <p>I'm an expanded row, check out my data!</p>
//         <p>{JSON.stringify(row.original, null, "\t")}</p>
//       </CardBody>
//     </Card>
//   );
// };
//
// export const ColumnFiltering = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           isColumnFilteringEnabled
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({ canFilter: true }),
//   },
// };
//
// export const ColumnFilteringFaceted = {
//   render: ({
//     data = [...dataBasic, ...dataBasic],
//     isFaceted = false,
//   }: {
//     data: TableData<Employee>[];
//     isFaceted: boolean;
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(
//       () =>
//         makeColumns({
//           canFilter: true,
//           isFaceted,
//         }),
//       [],
//     );
//
//     return (
//       <Container fluid>
//         <DataTable
//           columns={tableColumns}
//           data={tableData}
//           isFaceted={isFaceted}
//           isColumnFilteringEnabled
//         />
//       </Container>
//     );
//   },
//   args: {
//     isFaceted: undefined,
//   },
//   argTypes: {
//     isFaceted: {
//       control: "boolean",
//       description:
//         "When set to 'true', it configures the table to allow you to generate filter values from the" +
//         " unique values in the table. Useful for when there are duplicate values in a column or when you want to" +
//         " provide a dropdown filter that only has values from the table instead of a fully exhaustive list.",
//     },
//   },
// };
//
// export const ColumnSorting = {
//   render: ({
//     data,
//     columns,
//     initialSortingState,
//     isMultiSort,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//     initialSortingState: SortingState | undefined;
//     isMultiSort: boolean | undefined;
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     const key = JSON.stringify({ initialSortingState, isMultiSort });
//
//     return (
//       <Container key={key} fluid>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           isColumnSortingEnabled
//           initialSortingState={initialSortingState}
//           isMultiSort={isMultiSort}
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//     initialSortingState: undefined,
//     isMultiSort: undefined,
//   },
//   argTypes: {
//     initialSortingState: {
//       options: [
//         "none",
//         "id descending",
//         "firstName descending",
//         "lastName descending",
//         "title descending",
//         "id ascending",
//         "firstName ascending",
//         "lastName ascending",
//         "title ascending",
//       ],
//       mapping: {
//         none: undefined,
//         "id descending": [{ id: "id", desc: true }],
//         "firstName descending": [{ id: "firstName", desc: true }],
//         "lastName descending": [{ id: "lastName", desc: true }],
//         "title descending": [{ id: "title", desc: true }],
//         "id ascending": [{ id: "id", desc: false }],
//         "firstName ascending": [{ id: "firstName", desc: false }],
//         "lastName ascending": [{ id: "lastName", desc: false }],
//         "title ascending": [{ id: "title", desc: false }],
//       },
//     },
//     isMultiSort: {
//       control: "boolean",
//     },
//   },
// };
//
// export const ColumnVisibility = {
//   render: ({
//     canUserControlVisibility,
//     isColumnVisibilityEnabled,
//     variant = "light",
//   }: {
//     canUserControlVisibility: boolean | undefined;
//     isColumnVisibilityEnabled: boolean | undefined;
//     variant: Variant | undefined;
//   }) => {
//     const tableData = useMemo(() => dataBasic, []);
//     const tableColumns = useMemo(() => makeColumns({}), []);
//
//     const initialColumnVisibility: VisibilityState = { id: false };
//
//     const baseProps = { data: tableData, columns: tableColumns, variant };
//     const props = isColumnVisibilityEnabled
//       ? {
//           ...baseProps,
//           isColumnVisibilityEnabled,
//           canUserControlVisibility,
//           initialColumnVisibility,
//         }
//       : baseProps;
//
//     return (
//       <Container fluid style={{ maxWidth: 2500 }}>
//         <DataTable {...props} />
//       </Container>
//     );
//   },
//   args: {
//     canUserControlVisibility: undefined,
//     isColumnVisibilityEnabled: true,
//     variant: "light",
//   },
//   argTypes: {
//     canUserControlVisibility: {
//       control: "boolean",
//     },
//     isColumnVisibilityEnabled: {
//       control: "boolean",
//     },
//     variant: {
//       control: "select",
//       options: [
//         "danger",
//         "dark",
//         "info",
//         "light",
//         "light-danger",
//         "light-info",
//         "light-primary",
//         "light-secondary",
//         "light-success",
//         "light-warning",
//         "primary",
//         "secondary",
//         "success",
//         "warning",
//       ],
//     },
//   },
// };
//
// export const CustomRowColors = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <Card>
//           <CardHeader>
//             <CardTitle></CardTitle>
//           </CardHeader>
//         </Card>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           rowStyleOverride={{
//             accessorKey: "title",
//             styles: new Map<
//               TableData<Employee>[keyof TableData<Employee>],
//               CSSProperties
//             >([
//               [
//                 "Software Engineer",
//                 {
//                   // @ts-expect-error Doesn't like Bootstrap properties for some reason
//                   "--bs-table-striped-bg": "yellow",
//                   "--bs-table-bg": "yellow",
//                 },
//               ],
//             ]),
//           }}
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const DataExport = {
//   render: ({
//     buttonDisplay = "icon",
//     buttonIconSize = 0.8,
//     data,
//     columns,
//   }: {
//     buttonDisplay?: "text" | "icon" | "text-and-icon";
//     buttonIconSize?: number;
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable
//           buttonDisplay={buttonDisplay}
//           buttonIconSize={buttonIconSize}
//           data={tableData}
//           columns={tableColumns}
//           isExportEnabled
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({ isExportable: true }),
//   },
// };
//
// export const Default = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable data={tableData} columns={tableColumns} />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const KitchenSink = {
//   render: ({
//     bordered,
//     buttonDisplay = "text-and-icon",
//     buttonIconSize = 0.8,
//     canUserControlVisibility,
//     isColumnVisibilityEnabled,
//     isColumnFilteringEnabled,
//     isExportEnabled,
//     isPaginationEnabled,
//     isRowExpansionEnabled,
//     isRowSelectionEnabled,
//     isColumnSortingEnabled,
//     columns = makeColumns({ isExportable: true, canFilter: true }),
//     data = dataBasic,
//     fileName,
//     hover,
//     initialSortingState = [{ id: "id", desc: false }],
//     isMultiSort,
//     sheetName,
//     striped,
//     variant,
//   }: {
//     bordered: boolean;
//     buttonDisplay: "icon" | "text" | "text-and-icon";
//     buttonIconSize: number;
//     canUserControlVisibility?: boolean;
//     isColumnVisibilityEnabled?: boolean;
//     isColumnFilteringEnabled?: boolean;
//     isExportEnabled?: boolean;
//     isPaginationEnabled?: boolean;
//     isRowExpansionEnabled?: boolean;
//     isRowSelectionEnabled?: boolean;
//     isColumnSortingEnabled?: boolean;
//     columns: ColumnDef<TableData<Employee>>[];
//     data: TableData<Employee>[];
//     fileName?: string;
//     hover?: boolean;
//     initialSortingState?: SortingState;
//     isMultiSort?: boolean;
//     sheetName?: string;
//     striped?: boolean;
//     variant?: Variant;
//   }) => {
//     const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     const initialColumnVisibility: VisibilityState = { firstName: false };
//
//     const columnFilteringProps: ColumnFilteringProps = isColumnFilteringEnabled
//       ? {
//           isColumnFilteringEnabled,
//         }
//       : {};
//
//     const columnVisibilityProps: ColumnVisibilityProps =
//       isColumnVisibilityEnabled
//         ? {
//             isColumnVisibilityEnabled: true,
//             canUserControlVisibility,
//             initialColumnVisibility,
//           }
//         : {};
//
//     const columnSortingProps: ColumnSortingProps = isColumnSortingEnabled
//       ? {
//           initialSortingState,
//           isColumnSortingEnabled: true,
//           isMultiSort,
//         }
//       : {};
//
//     const exportProps: ExportProps = isExportEnabled
//       ? {
//           buttonDisplay,
//           buttonIconSize,
//           isExportEnabled: true,
//           fileName,
//           sheetName,
//         }
//       : {};
//
//     const paginationProps: PaginationProps = isPaginationEnabled
//       ? {
//           buttonDisplay,
//           buttonIconSize,
//           isPaginationEnabled: true,
//           pageSize: 5,
//         }
//       : {};
//
//     const rowExpansionProps: RowExpansionProps<TableData<Employee>> =
//       isRowExpansionEnabled
//         ? {
//             expandedRowComponent,
//             isRowExpansionEnabled: true,
//           }
//         : {};
//
//     const rowSelectionProps: RowSelectionProps<TableData<Employee>> =
//       isRowSelectionEnabled
//         ? {
//             getRowId: ({ id }: Employee) => `${id}`,
//             isRowSelectionEnabled: true,
//             setRowSelection,
//             rowSelection,
//           }
//         : {};
//
//     const baseProps = {
//       bordered,
//       columns: tableColumns,
//       data: tableData,
//       hover,
//       maxHeight: 300,
//       striped,
//       variant,
//     };
//
//     const props = {
//       ...baseProps,
//       ...columnFilteringProps,
//       ...columnSortingProps,
//       ...columnVisibilityProps,
//       ...exportProps,
//       ...paginationProps,
//       ...rowExpansionProps,
//       ...rowSelectionProps,
//     };
//
//     return (
//       <Container fluid style={{ maxWidth: 2000 }}>
//         <Card
//           className={`bg-${variant} overflow-auto`}
//           style={{ height: 300, maxHeight: 300 }}
//         >
//           <CardHeader>
//             <CardTitle>Selected Rows</CardTitle>
//             <Button
//               color={"primary"}
//               disabled={Object.keys(rowSelection).length < 1}
//               onClick={() => setRowSelection({})}
//             >
//               Reset Row Selection
//             </Button>
//           </CardHeader>
//           <CardBody>
//             {rowSelection && (
//               <ListGroup>
//                 {Object.keys(rowSelection).map((row) => (
//                   <ListGroupItem key={row}>
//                     Row with ID {row} is selected.
//                   </ListGroupItem>
//                 ))}
//               </ListGroup>
//             )}
//           </CardBody>
//         </Card>
//         <DataTable {...props} />
//       </Container>
//     );
//   },
//   args: {
//     bordered: undefined,
//     buttonDisplay: "text",
//     buttonIconSize: 0.8,
//     canUserControlVisibility: undefined,
//     isColumnVisibilityEnabled: true,
//     isColumnFilteringEnabled: true,
//     isExportEnabled: true,
//     isPaginationEnabled: true,
//     isRowExpansionEnabled: true,
//     isRowSelectionEnabled: true,
//     isColumnSortingEnabled: true,
//     fileName: undefined,
//     hover: undefined,
//     initialSortingState: "id ascending",
//     isMultiSort: undefined,
//     sheetName: undefined,
//     striped: undefined,
//     variant: "light",
//   },
//   argTypes: {
//     bordered: {
//       control: "boolean",
//     },
//     buttonDisplay: {
//       control: "select",
//       options: ["icon", "text", "text-and-icon"],
//     },
//     buttonIconSize: {
//       control: { type: "number", min: 0.1, step: 0.1 },
//     },
//     canUserControlVisibility: {
//       control: "boolean",
//     },
//     isColumnVisibilityEnabled: {
//       control: "boolean",
//     },
//     isColumnFilteringEnabled: {
//       control: "boolean",
//     },
//     isExportEnabled: {
//       control: "boolean",
//     },
//     isPaginationEnabled: {
//       control: "boolean",
//     },
//     isRowExpansionEnabled: {
//       control: "boolean",
//     },
//     isRowSelectionEnabled: {
//       control: "boolean",
//     },
//     isColumnSortingEnabled: {
//       control: "boolean",
//     },
//     fileName: {
//       control: "text",
//     },
//     hover: {
//       control: "boolean",
//     },
//     initialSortingState: {
//       options: [
//         "none",
//         "id descending",
//         "firstName descending",
//         "lastName descending",
//         "title descending",
//         "id ascending",
//         "firstName ascending",
//         "lastName ascending",
//         "title ascending",
//       ],
//       mapping: {
//         none: undefined,
//         "id descending": [{ id: "id", desc: true }],
//         "firstName descending": [{ id: "firstName", desc: true }],
//         "lastName descending": [{ id: "lastName", desc: true }],
//         "title descending": [{ id: "title", desc: true }],
//         "id ascending": [{ id: "id", desc: false }],
//         "firstName ascending": [{ id: "firstName", desc: false }],
//         "lastName ascending": [{ id: "lastName", desc: false }],
//         "title ascending": [{ id: "title", desc: false }],
//       },
//     },
//     isMultiSort: {
//       control: "boolean",
//     },
//     sheetName: {
//       control: "text",
//     },
//     striped: {
//       control: "boolean",
//     },
//     variant: {
//       control: "select",
//       options: [
//         "danger",
//         "dark",
//         "info",
//         "light",
//         "light-danger",
//         "light-info",
//         "light-primary",
//         "light-secondary",
//         "light-success",
//         "light-warning",
//         "primary",
//         "secondary",
//         "success",
//         "warning",
//       ],
//     },
//   },
// };
//
// export const Paginated = {
//   render: ({
//     buttonDisplay = "icon",
//     buttonIconSize = 0.8,
//     data,
//     columns,
//   }: {
//     buttonDisplay?: "text" | "icon" | "text-and-icon";
//     buttonIconSize?: number;
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable
//           buttonDisplay={buttonDisplay}
//           buttonIconSize={buttonIconSize}
//           data={tableData}
//           columns={tableColumns}
//           isPaginationEnabled
//           pageSize={3}
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const ResponsiveScrollableX = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid style={{ maxWidth: 1500 }}>
//         <DataTable data={tableData} columns={tableColumns} />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const ResponsiveScrollableY = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable data={tableData} columns={tableColumns} maxHeight={200} />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const RowExpandingWithExpandedRowComponent = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           isRowExpansionEnabled
//           expandedRowComponent={expandedRowComponent}
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export const RowExpandingWithSubRows = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           isRowExpansionEnabled
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataWithSubRows,
//     columns: makeColumns({}),
//   },
// };
//
// export const RowSelection = {
//   render: ({
//     data,
//     columns,
//   }: {
//     data: TableData<Employee>[];
//     columns: ColumnDef<TableData<Employee>>[];
//   }) => {
//     const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//
//     const tableData = useMemo(() => data, []);
//     const tableColumns = useMemo(() => columns, []);
//
//     return (
//       <Container fluid>
//         <Card
//           className={"bg-light-primary overflow-auto"}
//           style={{ height: 300, maxHeight: 300 }}
//         >
//           <CardHeader>
//             <CardTitle>Selected Rows</CardTitle>
//             <Button
//               color={"primary"}
//               disabled={Object.keys(rowSelection).length < 1}
//               onClick={() => setRowSelection({})}
//             >
//               Reset Row Selection
//             </Button>
//           </CardHeader>
//           <CardBody>
//             {rowSelection && (
//               <ListGroup>
//                 {Object.keys(rowSelection).map((row) => (
//                   <ListGroupItem key={row}>
//                     Row with ID {row} is selected.
//                   </ListGroupItem>
//                 ))}
//               </ListGroup>
//             )}
//           </CardBody>
//         </Card>
//         <DataTable
//           data={tableData}
//           columns={tableColumns}
//           getRowId={({ id }: Employee) => `${id}`}
//           isRowSelectionEnabled
//           setRowSelection={setRowSelection}
//           rowSelection={rowSelection}
//         />
//       </Container>
//     );
//   },
//   args: {
//     data: dataBasic,
//     columns: makeColumns({}),
//   },
// };
//
// export default meta;
