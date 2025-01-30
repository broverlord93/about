// import { Row as TableRow, Table } from "@tanstack/react-table";
// import { ChevronDown, ChevronRight } from "react-feather";
// import { Row } from "reactstrap";
//
// const DefaultExpanderColumn = <TData,>() => {
//   return {
//     id: "expander",
//     cell: ({
//              row: { getIsExpanded, toggleExpanded },
//            }: {
//       row: TableRow<TData>;
//     }) => {
//       return (
//         <>
//           {
//         <Row className={"cursor-pointer"} onClick={() => toggleExpanded()}>
//       {getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
//       </Row>
//     }
//       </>
//     );
//     },
//     enableColumnFilter: false,
//     header: ({
//                table: { getIsAllRowsExpanded, getToggleAllRowsExpandedHandler },
//              }: {
//       table: Table<TData>;
//     }) => {
//       return (
//         <Row
//           className={"cursor-pointer"}
//       onClick={getToggleAllRowsExpandedHandler()}
//       >
//       {getIsAllRowsExpanded() ? <ChevronDown /> : <ChevronRight />}
//       </Row>
//     );
//     },
//     size: 75,
//   };
// };
//
// export default DefaultExpanderColumn;