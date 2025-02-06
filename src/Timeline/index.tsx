import { objectsToString } from "@lib/utils";
import { forwardRef, HTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";
import TimelineBody from "./TimelineBody";
import TimelineConnector from "./TimelineConnector";
import TimelineHeader from "./TimelineHeader";
import TimelineIcon from "./TimelineIcon";
import TimelineItem from "./TimelineItem";

export interface TimelineProps extends HTMLAttributes<HTMLUListElement> {
  className?: string;
  children?: ReactNode;
}

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ className, children, ...rest }, ref) => {
    const { timeline } = useTheme();
    const { styles } = timeline;
    const { base } = styles;

    const classes = twMerge(objectsToString(base), className);

    return (
      <ul ref={ref} {...rest} className={classes}>
        {children}
      </ul>
    );
  },
);

Timeline.displayName = "Timeline";

export {
  TimelineItem,
  TimelineIcon,
  TimelineBody,
  TimelineHeader,
  TimelineConnector,
};

export default Object.assign(Timeline, {
  Item: TimelineItem,
  Icon: TimelineIcon,
  Header: TimelineHeader,
  Body: TimelineBody,
  Connector: TimelineConnector,
});
