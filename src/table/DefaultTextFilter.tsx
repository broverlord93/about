// import { mdiClose } from "@mdi/js";
// import Icon from "@mdi/react";
// import DebouncedInput from "@mycomponents/common/DebouncedInput";
// import type { Column, RowData } from "@tanstack/react-table";
// import { InputGroup, InputGroupText } from "reactstrap";
//
// const DefaultTextFilter = <TData extends RowData, TValue = unknown>({
//   column: { getFilterValue, setFilterValue },
//   searchLocation = "",
//   searchType = "",
// }: {
//   column: Column<TData, TValue>;
//   searchLocation?: string;
//   searchType?: string;
// }) => {
//   return (
//     <>
//       <InputGroup>
//         <DebouncedInput
//           debounce={250}
//           onChange={(value) => setFilterValue(value)}
//           placeholder={"Search..."}
//           value={(getFilterValue() as string) || ""}
//           searchLocation={searchLocation}
//           searchType={searchType}
//         />
//         <InputGroupText onClick={() => setFilterValue(undefined)}>
//           <span style={{ cursor: "pointer" }}>
//             <Icon path={mdiClose} size={1} />
//           </span>
//         </InputGroupText>
//       </InputGroup>
//     </>
//   );
// };
//
// export default DefaultTextFilter;
