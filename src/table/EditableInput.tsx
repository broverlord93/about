// import { useEffect } from "react";
// import { Anchor } from "react-bootstrap";
// import { FormFeedback, FormGroup, Input } from "reactstrap";
// import useInput from "@src/hooks/useInput";
//
// const EditableInput = ({
//   value: initialValue,
//   onChange,
//   options,
//   validate,
//   errorFeedback,
// }) => {
//   const {
//     value,
//     isEditing,
//     isTouched,
//     isValid,
//     onBlurHandler,
//     onChangeHandler,
//     onKeyUpHandler,
//     onToggleEditingHandler,
//   } = useInput({ initialValue, validate });
//
//   useEffect(() => {
//     if (isTouched && isValid) {
//       onChange(value);
//     }
//   }, [isValid, isTouched]);
//
//   if (isEditing) {
//     return (
//       <FormGroup>
//         <Input
//           invalid={!isValid}
//           onBlur={onBlurHandler}
//           onChange={onChangeHandler}
//           onKeyUp={onKeyUpHandler}
//           placeholder={"Enter a value..."}
//           value={value}
//           {...options}
//         />
//         <>{!isValid && <FormFeedback invalid>{errorFeedback}</FormFeedback>}</>
//       </FormGroup>
//     );
//   }
//
//   return (
//     <Anchor onClick={onToggleEditingHandler}>
//       <em>{value === "" ? "(Empty)" : value}</em>
//     </Anchor>
//   );
// };
//
// export default EditableInput;
