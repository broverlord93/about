import { objectsToString } from "@lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";

export interface TimelineHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const {
      timelineHeader: {
        styles: { base },
      },
    } = useTheme();

    const classes = twMerge(objectsToString(base), className);

    return (
      <div {...rest} ref={ref} className={classes}>
        {children}
      </div>
    );
  },
);

TimelineHeader.displayName = "TimelineHeader";

export default TimelineHeader;
