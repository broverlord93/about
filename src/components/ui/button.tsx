import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-silver-tree-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-silver-tree-950 dark:focus-visible:ring-silver-tree-300",
  {
    variants: {
      variant: {
        default:
          "bg-silver-tree-900 text-silver-tree-50 hover:bg-silver-tree-900/90 dark:bg-silver-tree-50 dark:text-silver-tree-900 dark:hover:bg-silver-tree-50/90",
        destructive:
          "bg-dark-tan-500 text-silver-tree-50 hover:bg-dark-tan-500/90 dark:bg-dark-tan-900 dark:text-silver-tree-50 dark:hover:bg-dark-tan-900/90",
        outline:
          "border border-silver-tree-200 bg-white hover:bg-silver-tree-100 hover:text-silver-tree-900 dark:border-silver-tree-800 dark:bg-silver-tree-950 dark:hover:bg-silver-tree-800 dark:hover:text-silver-tree-50",
        secondary:
          "bg-silver-tree-100 text-silver-tree-900 hover:bg-silver-tree-100/80 dark:bg-silver-tree-800 dark:text-silver-tree-50 dark:hover:bg-silver-tree-800/80",
        ghost:
          "hover:bg-silver-tree-100 hover:text-silver-tree-900 dark:hover:bg-silver-tree-800 dark:hover:text-silver-tree-50",
        link: "text-silver-tree-900 underline-offset-4 hover:underline dark:text-silver-tree-50",
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
