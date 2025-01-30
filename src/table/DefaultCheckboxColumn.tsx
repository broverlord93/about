// import type { Row as TableRow, Table } from "@tanstack/react-table";
// import { Col, Row } from "reactstrap";
// import IndeterminateCheckbox from "./IndeterminateCheckbox";
//
// const DefaultCheckboxColumn = <TData,>({
//   isPaginationEnabled = false,
// }: {
//   isPaginationEnabled: boolean;
// }) => {
//   return {
//     id: "select",
//     ...(isPaginationEnabled && {
//       footer: ({ table }: { table: Table<TData> }) => {
//         const { pagination } = table.getState();
//
//         return (
//           <Row className={"justify-content-start align-items-center"}>
//             <Col sm={3}>
//               <IndeterminateCheckbox
//                 {...{
//                   checked: table.getIsAllPageRowsSelected(),
//                   indeterminate: table.getIsSomePageRowsSelected(),
//                   onChange: table.getToggleAllPageRowsSelectedHandler(),
//                 }}
//               />
//             </Col>
//             <Col sm={9}>
//               <span className={"text-start align-middle"}>
//                 Select All <br />
//                 {pagination?.pageSize && `Page Rows (${pagination.pageSize})`}
//               </span>
//             </Col>
//           </Row>
//         );
//       },
//     }),
//     header: ({ table }: { table: Table<TData> }) => (
//       <Row className={"justify-content-start align-items-center"}>
//         <Col>
//           <IndeterminateCheckbox
//             {...{
//               checked: table.getIsAllRowsSelected(),
//               indeterminate: table.getIsSomeRowsSelected(),
//               onChange: table.getToggleAllRowsSelectedHandler(),
//             }}
//           />
//         </Col>
//       </Row>
//     ),
//     cell: ({ row }: { row: TableRow<TData> }) => (
//       <Row className={"justify-content-start align-items-center"}>
//         <Col>
//           <IndeterminateCheckbox
//             {...{
//               checked: row.getIsSelected(),
//               disabled: !row.getCanSelect(),
//               onChange: row.getToggleSelectedHandler(),
//             }}
//           />
//         </Col>
//       </Row>
//     ),
//     size: isPaginationEnabled ? 250 : 100,
//   };
// };
//
// export default DefaultCheckboxColumn;
