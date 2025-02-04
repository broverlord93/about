import { color, variant } from "../types";
import filled from "./colors/filled";
import ghost from "./colors/ghost";
import gradient from "./colors/gradient";
import outlined from "./colors/outlined";

export interface TimelineIconStyleTypes {
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
    variants?: {
      ghost?: typeof ghost;
      filled?: typeof filled;
      outlined?: typeof outlined;
      gradient?: typeof gradient;
    };
  };
}

export const timelineIcon: TimelineIconStyleTypes = {
  defaultProps: {
    color: "gray",
    variant: "filled",
  },
  styles: {
    base: {
      width: "w-max",
      height: "w-max",
      padding: "p-1.5",
      position: "relative",
      zIndex: "z-[2]",
      flexShrink: "flex-shrink-0",
      borderRadius: "rounded-full",
      overflow: "overflow-hidden",
    },
    variants: {
      ghost,
      filled,
      outlined,
      gradient,
    },
  },
};

export default timelineIcon;
