import { useMergeRefs } from "@floating-ui/react";
import { objectsToString } from "@lib/utils";
import type { Color, Variant } from "@type-defs/style";
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./theme";
import { useTimelineItem } from "./TimelineItem";

export interface TimelineIconProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: ReactNode;
  variant?: Variant;
  color?: Color;
}

export const TimelineIcon = forwardRef<HTMLSpanElement, TimelineIconProps>(
  (
    { color = "gray", variant = "filled", className, children, ...rest },
    ref,
  ) => {
    const {
      timelineIcon: {
        styles: { base, variants },
      },
    } = useTheme();

    const { setWidth } = useTimelineItem();

    const innerRef = useRef<HTMLSpanElement>(null);
    const mergedRef = useMergeRefs([ref, innerRef]);

    useEffect(() => {
      const iconElement = innerRef.current;

      if (iconElement) {
        const { width } = iconElement.getBoundingClientRect();

        setWidth(width);

        return () => {
          setWidth(0);
        };
      }
    }, [setWidth, className, children]);

    const variantClasses = objectsToString(variants[variant][color]);
    const classes = twMerge(objectsToString(base), variantClasses, className);

    return (
      <span ref={mergedRef} {...rest} className={classes}>
        {children}
      </span>
    );
  },
);

TimelineIcon.displayName = "TimelineIcon";

export default TimelineIcon;
