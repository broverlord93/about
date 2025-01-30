// import {
//   Button,
//   ButtonGroup,
//   ButtonToolbar,
//   Col,
//   Label,
//   Row,
// } from "reactstrap";
// import Select from "react-select";
// import Icon from "@mdi/react";
// import {
//   mdiChevronDoubleLeft,
//   mdiChevronDoubleRight,
//   mdiChevronLeft,
//   mdiChevronRight,
// } from "@mdi/js";
// import type { ButtonDisplay } from "@types";
// import { DropdownTracker, PaginationTracker } from "@helpers/tracking_template";
// import { track } from "@helpers/analytics";
// import { DROPDOWN_SELECT } from "@helpers/eventNameConstants";
//
// interface BaseProps {
//   firstPage: () => void;
//   lastPage: () => void;
//   nextPage: () => void;
//   previousPage: () => void;
//   getCanNextPage: () => boolean;
//   getCanPreviousPage: () => boolean;
//   getPageCount: () => number;
//   getPageIndex: () => number;
//   getPageSize: () => number;
//   getRowCount: () => number;
//   setPageIndex: (index: number) => void;
//   setPageSize: (size: number) => void;
//   defaultPageSize?: number;
//   tableName?: string;
// }
//
// type PaginationProps = BaseProps & ButtonDisplay;
//
// const BUTTON = {
//   FIRST: "First",
//   PREVIOUS: "Previous",
//   NEXT: "Next",
//   LAST: "Last",
// } as const;
//
// type ButtonLabel = typeof BUTTON;
//
// type ButtonKey = keyof ButtonLabel;
//
// type ButtonValue = ButtonLabel[ButtonKey];
//
// const getPages = (count: number) => {
//   const array = [];
//
//   for (let i = 0; i < count; i++) {
//     array.push(i);
//   }
//
//   return array;
// };
//
// const Pagination = ({
//   firstPage,
//   nextPage,
//   lastPage,
//   previousPage,
//   getCanNextPage,
//   getCanPreviousPage,
//   getPageCount,
//   getPageIndex,
//   getPageSize,
//   getRowCount,
//   setPageIndex,
//   setPageSize,
//   buttonDisplay = "text",
//   buttonIconSize = 1,
//   defaultPageSize = 20,
//   variant = "primary",
//   tableName = "",
// }: PaginationProps) => {
//   const getPageOptions = () => {
//     const nextTen = getRowCount() + (10 - (getRowCount() % 10));
//     const options = new Set([
//       5,
//       10,
//       20,
//       50,
//       100,
//       250,
//       500,
//       1000,
//       nextTen,
//       defaultPageSize,
//     ]);
//
//     return Array.from(options)
//       .filter((value) => {
//         return nextTen < defaultPageSize
//           ? value <= defaultPageSize
//           : value <= nextTen;
//       })
//       .sort((a, b) => a - b)
//       .map((value) => ({ label: `${value}`, value }));
//   };
//
//   const getIcon = ({ text }: { text: ButtonValue }) => {
//     let icon;
//
//     switch (text) {
//       case BUTTON.FIRST:
//         icon = <Icon path={mdiChevronDoubleLeft} size={buttonIconSize} />;
//         break;
//       case BUTTON.PREVIOUS:
//         icon = <Icon path={mdiChevronLeft} size={buttonIconSize} />;
//         break;
//       case BUTTON.NEXT:
//         icon = <Icon path={mdiChevronRight} size={buttonIconSize} />;
//         break;
//       case BUTTON.LAST:
//         icon = <Icon path={mdiChevronDoubleRight} size={buttonIconSize} />;
//         break;
//       default:
//         icon = <></>;
//     }
//
//     return <span>{icon}</span>;
//   };
//
//   const getButtonLabel = (text: ButtonValue) => {
//     return buttonDisplay === "text" ? (
//       text
//     ) : (
//       <span>
//         {getIcon({ text })}
//         {buttonDisplay === "text-and-icon" && `${text}`}
//       </span>
//     );
//   };
//
//   return (
//     <Row className={"align-items-center justify-content-start"}>
//       <Col className={"align-self-start"}>
//         <Row className={"align-items-center justify-content-evenly"}>
//           <Col>
//             <ButtonToolbar id={"button-toolbar"}>
//               <ButtonGroup>
//                 <Button
//                   color={variant}
//                   disabled={!getCanPreviousPage()}
//                   onClick={() => {
//                     firstPage();
//                     PaginationTracker("First Page", tableName, "Button");
//                   }}
//                 >
//                   {getButtonLabel(BUTTON.FIRST)}
//                 </Button>
//                 <Button
//                   color={variant}
//                   disabled={!getCanPreviousPage()}
//                   onClick={() => {
//                     previousPage();
//                     PaginationTracker("Previous Page", tableName, "Button");
//                   }}
//                 >
//                   {getButtonLabel(BUTTON.PREVIOUS)}
//                 </Button>
//                 <Button
//                   color={variant}
//                   disabled={!getCanNextPage()}
//                   onClick={() => {
//                     nextPage();
//                     PaginationTracker("Next Page", tableName, "Button");
//                   }}
//                 >
//                   {getButtonLabel(BUTTON.NEXT)}
//                 </Button>
//                 <Button
//                   color={variant}
//                   disabled={!getCanNextPage()}
//                   onClick={() => {
//                     lastPage();
//                     PaginationTracker("Last Page", tableName, "Button");
//                   }}
//                 >
//                   {getButtonLabel(BUTTON.LAST)}
//                 </Button>
//               </ButtonGroup>
//             </ButtonToolbar>
//           </Col>
//           <Col>
//             <Label htmlFor={"button-toolbar"}>
//               Page {getPageIndex() + 1} of {getPageCount().toLocaleString()}{" "}
//             </Label>
//           </Col>
//         </Row>
//       </Col>
//       <Col>
//         <Row className={"align-items-center"}>
//           <Col className={"text-end"}>
//             <Label for={"page-select"}>Go to page:</Label>
//           </Col>
//           <Col className={"text-start"}>
//             <Select
//               defaultValue={{
//                 label: `${getPageIndex() + 1}`,
//                 value: getPageIndex() + 1,
//               }}
//               id={"page-select"}
//               onChange={(choice) => {
//                 if (choice) {
//                   setPageIndex(choice.value);
//                   PaginationTracker(
//                     choice.value + 1,
//                     tableName,
//                     "Dropdown Select",
//                   );
//                 }
//               }}
//               options={getPages(getPageCount()).map((value) => ({
//                 label: `${value + 1}`,
//                 value,
//               }))}
//             />
//           </Col>
//         </Row>
//       </Col>
//       <Col>
//         <Row className={"align-items-center"}>
//           <Col className={"text-end"}>
//             <Label htmlFor={"row-count-select"}>Rows per page: </Label>
//           </Col>
//           <Col className={"text-start"}>
//             <Select
//               defaultValue={{
//                 label: `${getPageSize()}`,
//                 value: getPageSize(),
//               }}
//               id={"row-count-select"}
//               onChange={(choice) => {
//                 if (choice) {
//                   setPageSize(choice.value);
//                   track(DROPDOWN_SELECT, {
//                     optionSelected: choice.value,
//                     dropdownType: "Page size select",
//                     table: tableName,
//                   });
//                 }
//               }}
//               options={getPageOptions()}
//             />
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//   );
// };
//
// export default Pagination;
