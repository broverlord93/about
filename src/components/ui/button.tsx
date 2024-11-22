import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-millbrook-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-millbrook-950 dark:focus-visible:ring-millbrook-300",
  {
    variants: {
      variant: {
        default:
          "bg-millbrook-900 text-millbrook-50 hover:bg-millbrook-900/90 dark:bg-millbrook-50 dark:text-millbrook-900 dark:hover:bg-millbrook-50/90",
        destructive:
          "bg-red-500 text-millbrook-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-millbrook-50 dark:hover:bg-red-900/90",
        outline:
          "border border-millbrook-200 bg-white hover:bg-millbrook-100 hover:text-millbrook-900 dark:border-millbrook-800 dark:bg-millbrook-950 dark:hover:bg-millbrook-800 dark:hover:text-millbrook-50",
        secondary:
          "bg-millbrook-100 text-millbrook-900 hover:bg-millbrook-100/80 dark:bg-millbrook-800 dark:text-millbrook-50 dark:hover:bg-millbrook-800/80",
        ghost:
          "hover:bg-millbrook-100 hover:text-millbrook-900 dark:hover:bg-millbrook-800 dark:hover:text-millbrook-50",
        link: "text-millbrook-900 underline-offset-4 hover:underline dark:text-millbrook-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
