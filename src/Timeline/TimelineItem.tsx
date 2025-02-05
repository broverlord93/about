import { objectsToString } from "@lib/utils";
import {
  createContext,
  type Dispatch,
  forwardRef,
  type HTMLAttributes,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";
import { children, className } from "./types";

const TimelineItemContext = createContext<
  | {
      width: number;
      setWidth: Dispatch<SetStateAction<number>>;
    }
  | undefined
>(undefined);

TimelineItemContext.displayName = "TimelineItemContext";

export function useTimelineItem() {
  const context = useContext(TimelineItemContext);
  if (!context) {
    throw new Error(
      "useTimelineItemContext() must be used within a TimelineItem. It happens when you use TimelineIcon, TimelineConnector or TimelineBody components outside the TimelineItem component.",
    );
  }

  return context;
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: className;
  children?: children;
}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, ...rest }, ref) => {
    const { timelineItem } = useTheme();

    const { styles } = timelineItem;
    const base = styles?.base;

    const [width, setWidth] = useState(0);

    const classes = base
      ? twMerge(objectsToString(base), className)
      : className;

    return (
      <TimelineItemContext.Provider value={{ width, setWidth }}>
        <li ref={ref} {...rest} className={classes}>
          {children}
        </li>
      </TimelineItemContext.Provider>
    );
  },
);

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
