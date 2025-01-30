// import { type Ref, useEffect, useRef } from "react";
// import { Input, type InputProps } from "reactstrap";
//
// interface Indeterminate extends HTMLInputElement {
//   indeterminate: boolean;
// }
//
// const IndeterminateCheckbox = ({
//   indeterminate,
//   className = "",
//   ...rest
// }: { indeterminate?: boolean } & InputProps) => {
//   const ref = useRef<Indeterminate>();
//
//   useEffect(() => {
//     if (indeterminate && ref.current) {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [indeterminate]);
//
//   return (
//     <Input
//       type="checkbox"
//       innerRef={ref as Ref<Indeterminate>}
//       className={`${className} cursor-pointer`}
//       {...rest}
//     />
//   );
// };
//
// export default IndeterminateCheckbox;
