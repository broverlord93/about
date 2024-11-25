import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-husk-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-husk-950 dark:focus-visible:ring-husk-300",
  {
    variants: {
      variant: {
        danger:
          "bg-wax-flower-500 text-husk-50 hover:bg-wax-flower-500/90 dark:bg-wax-flower-900 dark:text-husk-50 dark:hover:bg-wax-flower-900/90",
        default:
          "bg-husk-900 text-husk-50 hover:bg-husk-900/90 dark:bg-husk-50 dark:text-husk-900 dark:hover:bg-husk-50/90",
        ghost:
          "hover:bg-husk-100 hover:text-husk-900 dark:hover:bg-husk-800 dark:hover:text-husk-50",
        info: "bg-tradewind-500 text-husk-50 hover:bg-tradewind-500/90 dark:bg-tradewind-900 dark:text-husk-50 dark:hover:bg-tradewind-900/90",
        link: "text-husk-900 underline-offset-4 hover:underline dark:text-husk-50",
        outline:
          "border border-husk-200 bg-white hover:bg-husk-100 hover:text-husk-900 dark:border-husk-800 dark:bg-husk-950 dark:hover:bg-husk-800 dark:hover:text-husk-50",
        secondary:
          "bg-husk-100 text-husk-900 hover:bg-husk-100/80 dark:bg-husk-800 dark:text-husk-50 dark:hover:bg-husk-800/80",
        success:
          "bg-sugar-cane-500 text-husk-50 hover:bg-sugar-cane-500/90 dark:bg-sugar-cane-900 dark:text-husk-50 dark:hover:bg-sugar-cane-900/90",
        warning:
          "bg-pipi-500 text-husk-50 hover:bg-pipi-500/90 dark:bg-pipi-900 dark:text-husk-50 dark:hover:bg-pipi-900/90",
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
