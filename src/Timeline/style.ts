import { filled, ghost, gradient, outlined } from "./colors";

export const timeline = {
  styles: {
    base: {
      display: "w-full",
      position: "flex",
      flexDirection: "flex-col",
    },
  },
};

export const timelineBody = {
  styles: {
    base: {
      display: "flex",
      gap: "gap-4",
    },
  },
};

export const timelineConnector = {
  styles: {
    base: {
      container: {
        position: "absolute",
        left: "left-0",
        display: "grid",
        justifyContent: "justify-center",
        backgroundColor: "bg-transparent",
        transition: "transition-opacity duration-200",
      },
      line: {
        width: "w-0.5",
        height: "h-full",
        backgroundColor: "bg-blue-gray-100",
      },
    },
  },
};

export const timelineHeader = {
  styles: {
    base: {
      display: "flex",
      alignItems: "items-center",
      gap: "gap-4",
    },
  },
};

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

export const timelineItem = {
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
