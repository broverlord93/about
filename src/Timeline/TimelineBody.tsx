import { objectsToString } from "@lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";
import { useTimelineItem } from "./TimelineItem";

export interface TimelineBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export const TimelineHeader = forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const {
      timelineBody: {
        styles: { base },
      },
    } = useTheme();
    const { width } = useTimelineItem();

    const classes = twMerge(objectsToString(base), className);

    return (
      <div {...rest} ref={ref} className={classes}>
        <span
          className="pointer-events-none invisible h-full flex-shrink-0"
          style={{
            width: `${width}px`,
          }}
        />
        <div>{children}</div>
      </div>
    );
  },
);

TimelineHeader.displayName = "TimelineHeader";

export default TimelineHeader;
