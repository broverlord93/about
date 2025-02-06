import { objectsToString } from "@lib/utils";
import {
  cloneElement,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";
import { useTimelineItem } from "./TimelineItem";

export interface TimelineConnectorProps
  extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: ReactNode;
}

export const TimelineConnector = forwardRef<
  HTMLSpanElement,
  TimelineConnectorProps
>(({ className, children, ...rest }, ref) => {
  const {
    timelineConnector: {
      styles: { base },
    },
  } = useTheme();
  const { width } = useTimelineItem();

  const lineClasses = objectsToString(base.line);
  const containerClasses = twMerge(objectsToString(base.container), className);

  return (
    <span
      {...rest}
      ref={ref}
      className={containerClasses}
      style={{
        top: `${width}px`,
        width: `${width}px`,
        opacity: width ? 1 : 0,
        height: `calc(100% - ${width}px)`,
      }}
    >
      {children && isValidElement(children) ? (
        cloneElement(children as ReactElement, {
          className: twMerge(lineClasses, children.props?.className),
        })
      ) : (
        <span className={lineClasses} />
      )}
    </span>
  );
});

TimelineConnector.displayName = "TimelineConnector";

export default TimelineConnector;
