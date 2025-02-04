import { color, variant } from "../types";

export interface TimelineItemStyleTypes {
  defaultProps?: {
    color?: color;
    variant?: variant;
  };
  valid?: {
    colors?: string[];
    variants?: string[];
  };
  styles?: {
    base?: object;
  };
}

export const timelineItem: TimelineItemStyleTypes = {
  defaultProps: {
    color: "gray",
    variant: "filled",
  },
  styles: {
    base: {
      display: "flex",
      position: "relative",
      flexDirection: "flex-col",
      gap: "gap-2",
    },
  },
};

export default timelineItem;
