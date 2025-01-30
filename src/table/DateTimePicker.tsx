// import { mdiCalendarClock } from "@mdi/js";
// import Icon from "@mdi/react";
// import flatpickr from "flatpickr";
// import { type FC, type ReactNode, useCallback } from "react";
// import Flatpickr, { type DateTimePickerProps } from "react-flatpickr";
// import { Input, InputGroup, InputGroupText, type InputProps } from "reactstrap";
// import Hook = flatpickr.Options.Hook;
//
// interface Props
//   extends Omit<DateTimePickerProps, "children" | "onChange" | "render"> {
//   onChange: Hook;
//   inputProps?: InputProps;
//   useIcon?: boolean | ReactNode;
// }
//
// export const DateTimePicker: FC<Props> = ({
//   inputProps,
//   onChange,
//   options,
//   useIcon = true,
//   ...rest
// }) => {
//   const getIcon = useCallback(() => {
//     if (useIcon) {
//       return (
//         <InputGroupText>
//           <span className={"text-primary"}>
//             <Icon path={mdiCalendarClock} size={1} />
//           </span>
//         </InputGroupText>
//       );
//     }
//
//     return <>{useIcon && <InputGroupText>{useIcon}</InputGroupText>}</>;
//   }, [useIcon]);
//
//   return (
//     <Flatpickr
//       onChange={onChange}
//       options={{ dateFormat: "F j, Y H:i", enableTime: true, ...options }}
//       render={({}, ref) => (
//         <InputGroup>
//           {getIcon()}
//           <Input className={"bg-white"} innerRef={ref} {...inputProps} />
//         </InputGroup>
//       )}
//       {...rest}
//     />
//   );
// };
//
// export default DateTimePicker;
