// import React from "react";
//
// // utils
// import { twMerge } from "tailwind-merge";
//
// // context
// import { useTheme } from "../../context/theme";
//
// // types
// import {
//   children,
//   className,
//   propTypeChildren,
//   propTypeClassName,
// } from "../../types/components/timeline";
// import objectsToString from "../../utils/objectsToString";
// import TimelineBody from "./TimelineBody";
// import TimelineConnector from "./TimelineConnector";
// import TimelineHeader from "./TimelineHeader";
// import TimelineIcon from "./TimelineIcon";
//
// // components
// import TimelineItem from "./TimelineItem";
//
// export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
//   className?: className;
//   children?: children;
// }
//
// export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
//   ({ className, children, ...rest }, ref) => {
//     // 1. init
//     const { timeline } = useTheme();
//     const { styles } = timeline;
//     const { base } = styles;
//
//     // 3. set styles
//     const classes = twMerge(objectsToString(base), className);
//
//     // 4. return
//     return (
//       <ul ref={ref} {...rest} className={classes}>
//         {children}
//       </ul>
//     );
//   },
// );
//
// Timeline.propTypes = {
//   className: propTypeClassName,
//   children: propTypeChildren,
// };
//
// Timeline.displayName = "MaterialTailwind.Timeline";
//
// export {
//   TimelineItem,
//   TimelineIcon,
//   TimelineBody,
//   TimelineHeader,
//   TimelineConnector,
// };
// export default Object.assign(Timeline, {
//   Item: TimelineItem,
//   Icon: TimelineIcon,
//   Header: TimelineHeader,
//   Body: TimelineBody,
//   Connector: TimelineConnector,
// });
