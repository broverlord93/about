import { arrayMerge } from "@lib/utils";
import merge from "deepmerge";
import { createContext, type FC, PropsWithChildren, useContext } from "react";
import {
  timeline,
  timelineBody,
  timelineConnector,
  timelineHeader,
  timelineIcon,
  timelineItem,
} from "./style";

const theme: object = {
  timeline,
  timelineItem,
  timelineIcon,
  timelineHeader,
  timelineBody,
  timelineConnector,
};

const TimelineTheme = createContext(theme);

TimelineTheme.displayName = "TimelineTheme";

export const ThemeProvider: FC<PropsWithChildren<{ value: object }>> = ({
  value = theme,
  children,
}) => {
  const mergedValue: object = merge(theme, value, { arrayMerge });

  return (
    <TimelineTheme.Provider value={mergedValue}>
      {children}
    </TimelineTheme.Provider>
  );
};

export const useTheme = () => useContext(TimelineTheme);
