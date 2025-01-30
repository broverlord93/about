// import useInput from "@src/hooks/useInput";
// import { useEffect } from "react";
// import { Input, type InputProps } from "reactstrap";
// import { SearchTracker } from "@helpers/tracking_template";
//
// const DebouncedInput = ({
//   searchLocation = "",
//   searchType = "",
//   value: initialValue,
//   onChange,
//   debounce = 500,
//   ...props
// }: {
//   searchLocation?: string;
//   searchType?: string;
//   value: string | number;
//   onChange: (value: string | number) => void;
//   debounce?: number;
// } & Omit<InputProps, "onChange">) => {
//   const { debouncedValue, onChangeHandler, value } = useInput({
//     debounce,
//     initialValue,
//   });
//
//   useEffect(() => {
//     onChange(debouncedValue);
//     if (debouncedValue) {
//       SearchTracker(debouncedValue, searchType, searchLocation);
//     }
//   }, [debouncedValue]);
//
//   return <Input {...props} value={value} onChange={onChangeHandler} />;
// };
//
// export default DebouncedInput;
