import { filled, ghost, gradient, outlined } from "./colors";

export const timelineIcon = {
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
